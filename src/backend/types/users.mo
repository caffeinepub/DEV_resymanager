import Common "common";
import Principal "mo:core/Principal";

module {
  public type InviteStatus = { #pending; #accepted };

  public type User = {
    id : Common.UserId;
    name : Text;
    email : Text;
    var principal : ?Principal;
    var inviteToken : Text;
    var inviteStatus : InviteStatus;
    var isActive : Bool;
    createdAt : Common.Timestamp;
  };

  public type UserView = {
    id : Common.UserId;
    name : Text;
    email : Text;
    principal : ?Principal;
    inviteToken : Text;
    inviteStatus : InviteStatus;
    isActive : Bool;
    createdAt : Common.Timestamp;
  };

  public type CreateUserRequest = {
    name : Text;
    email : Text;
  };

  public type AuthResult = {
    #ok : UserView;
    #deactivated;
    #notFound;
  };
};
