import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Types "../types/users";
import Common "../types/common";

module {
  public func toView(user : Types.User) : Types.UserView {
    {
      id = user.id;
      name = user.name;
      email = user.email;
      principal = user.principal;
      inviteToken = user.inviteToken;
      inviteStatus = user.inviteStatus;
      isActive = user.isActive;
      createdAt = user.createdAt;
    };
  };

  public func getUserByPrincipal(
    users : List.List<Types.User>,
    caller : Principal,
  ) : ?Types.User {
    users.find(func(u) { u.principal == ?caller });
  };

  public func getUserById(
    users : List.List<Types.User>,
    userId : Common.UserId,
  ) : ?Types.User {
    users.find(func(u) { u.id == userId });
  };

  public func resolveCallerAuth(
    users : List.List<Types.User>,
    caller : Principal,
  ) : Types.AuthResult {
    switch (getUserByPrincipal(users, caller)) {
      case null { #notFound };
      case (?u) {
        if (not u.isActive) { #deactivated }
        else { #ok(toView(u)) };
      };
    };
  };

  public func createUser(
    users : List.List<Types.User>,
    nextId : Nat,
    req : Types.CreateUserRequest,
    inviteToken : Text,
    now : Common.Timestamp,
  ) : Types.User {
    let user : Types.User = {
      id = nextId;
      name = req.name;
      email = req.email;
      var principal = null;
      var inviteToken = inviteToken;
      var inviteStatus = #pending;
      var isActive = true;
      createdAt = now;
    };
    users.add(user);
    user;
  };

  public func acceptInvite(
    users : List.List<Types.User>,
    inviteToken : Text,
    caller : Principal,
  ) : ?Types.UserView {
    switch (users.find(func(u) { u.inviteToken == inviteToken })) {
      case null { null };
      case (?u) {
        u.principal := ?caller;
        u.inviteStatus := #accepted;
        ?toView(u);
      };
    };
  };

  public func deactivateUser(
    users : List.List<Types.User>,
    userId : Common.UserId,
  ) : Bool {
    switch (getUserById(users, userId)) {
      case null { false };
      case (?u) {
        u.isActive := false;
        true;
      };
    };
  };

  public func listUsers(
    users : List.List<Types.User>,
  ) : [Types.UserView] {
    users.map<Types.User, Types.UserView>(toView).toArray();
  };
};
