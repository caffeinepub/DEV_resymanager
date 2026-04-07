import Common "common";

module {
  // Date as ISO string "YYYY-MM-DD" for simplicity
  public type DateString = Text;

  public type Reservation = {
    id : Nat;
    date : DateString;
    name : Text;
    phone : Text;
    userId : Common.UserId; // employee who added it
    arriveTime : Common.MinutesFromMidnight;
    leaveTime : ?Common.MinutesFromMidnight; // null = end of service window
    guestCount : Nat;
    notes : Text;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type ReservationView = {
    id : Nat;
    date : DateString;
    name : Text;
    phone : Text;
    userId : Common.UserId;
    arriveTime : Common.MinutesFromMidnight;
    leaveTime : ?Common.MinutesFromMidnight;
    guestCount : Nat;
    notes : Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type CreateReservationRequest = {
    date : DateString;
    name : Text;
    phone : Text;
    arriveTime : Common.MinutesFromMidnight;
    leaveTime : ?Common.MinutesFromMidnight;
    guestCount : Nat;
    notes : Text;
  };

  public type UpdateReservationRequest = {
    id : Nat;
    date : DateString;
    name : Text;
    phone : Text;
    arriveTime : Common.MinutesFromMidnight;
    leaveTime : ?Common.MinutesFromMidnight;
    guestCount : Nat;
    notes : Text;
  };
};
