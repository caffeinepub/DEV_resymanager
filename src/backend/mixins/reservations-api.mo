import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UsersLib "../lib/users";
import ReservationsLib "../lib/reservations";
import UserTypes "../types/users";
import Types "../types/reservations";

mixin (
  accessControlState : AccessControl.AccessControlState,
  users : List.List<UserTypes.User>,
  reservations : List.List<Types.Reservation>,
) {
  var nextReservationId : Nat = 1;

  /// Authenticated user — create a new reservation (userId auto-filled from caller).
  public shared ({ caller }) func createReservation(req : Types.CreateReservationRequest) : async Types.ReservationView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to create reservations");
    };
    let user = switch (UsersLib.getUserByPrincipal(users, caller)) {
      case null { Runtime.trap("User not found") };
      case (?u) { u };
    };
    if (not user.isActive) {
      Runtime.trap("Unauthorized: Account is deactivated");
    };
    let r = ReservationsLib.createReservation(reservations, nextReservationId, req, user.id, Time.now());
    nextReservationId += 1;
    ReservationsLib.toView(r);
  };

  /// Authenticated user — update an existing reservation.
  public shared ({ caller }) func updateReservation(req : Types.UpdateReservationRequest) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to update reservations");
    };
    let user = switch (UsersLib.getUserByPrincipal(users, caller)) {
      case null { Runtime.trap("User not found") };
      case (?u) { u };
    };
    if (not user.isActive) {
      Runtime.trap("Unauthorized: Account is deactivated");
    };
    ReservationsLib.updateReservation(reservations, req, Time.now());
  };

  /// Authenticated user — delete a reservation.
  public shared ({ caller }) func deleteReservation(id : Nat) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to delete reservations");
    };
    let user = switch (UsersLib.getUserByPrincipal(users, caller)) {
      case null { Runtime.trap("User not found") };
      case (?u) { u };
    };
    if (not user.isActive) {
      Runtime.trap("Unauthorized: Account is deactivated");
    };
    ReservationsLib.deleteReservation(reservations, id);
  };

  /// Authenticated user — list reservations for a given date, sorted by arrive time.
  public query ({ caller }) func listReservationsByDate(date : Types.DateString) : async [Types.ReservationView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to list reservations");
    };
    ReservationsLib.listByDate(reservations, date);
  };
};
