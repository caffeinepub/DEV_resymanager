import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UsersLib "../lib/users";
import Types "../types/users";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  users : List.List<Types.User>,
) {
  var nextUserId : Nat = 1;

  /// Returns authenticated user info, or error variant if deactivated/not found.
  /// On the very first call (no users exist), auto-creates the caller as the admin.
  public shared ({ caller }) func getMe() : async Types.AuthResult {
    if (users.size() == 0) {
      // Bootstrap: first caller becomes admin
      let adminReq : Types.CreateUserRequest = { name = "Admin"; email = "" };
      let token = caller.toText() # "-admin-bootstrap";
      let user = UsersLib.createUser(users, nextUserId, adminReq, token, Time.now());
      nextUserId += 1;
      // Link principal and mark accepted
      user.principal := ?caller;
      user.inviteStatus := #accepted;
      // Grant admin role
      AccessControl.assignRole(accessControlState, caller, caller, #admin);
      #ok(UsersLib.toView(user));
    } else {
      UsersLib.resolveCallerAuth(users, caller);
    };
  };

  /// Admin only — create a new user and return their invite token.
  public shared ({ caller }) func createUser(req : Types.CreateUserRequest) : async Text {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create users");
    };
    let token = caller.toText() # "-" # req.email # "-" # (Time.now()).toText();
    let _user = UsersLib.createUser(users, nextUserId, req, token, Time.now());
    nextUserId += 1;
    token;
  };

  /// Public — accept an invite by linking caller principal to the user record.
  public shared ({ caller }) func acceptInvite(inviteToken : Text) : async ?Types.UserView {
    switch (UsersLib.acceptInvite(users, inviteToken, caller)) {
      case null { null };
      case (?view) {
        // Directly insert caller into userRoles as #user, bypassing the admin
        // check in assignRole() — this is safe because the invite token has
        // already been validated and the user record marked #accepted above.
        accessControlState.userRoles.add(caller, #user);
        ?view;
      };
    };
  };

  /// Admin only — list all users.
  public query ({ caller }) func listUsers() : async [Types.UserView] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list users");
    };
    UsersLib.listUsers(users);
  };

  /// Admin only — deactivate a user account.
  public shared ({ caller }) func deactivateUser(userId : Common.UserId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can deactivate users");
    };
    UsersLib.deactivateUser(users, userId);
  };
};
