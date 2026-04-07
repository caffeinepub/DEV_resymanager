import List "mo:core/List";
import Array "mo:core/Array";
import Types "../types/reservations";
import Common "../types/common";

module {
  public func toView(r : Types.Reservation) : Types.ReservationView {
    {
      id = r.id;
      date = r.date;
      name = r.name;
      phone = r.phone;
      userId = r.userId;
      arriveTime = r.arriveTime;
      leaveTime = r.leaveTime;
      guestCount = r.guestCount;
      notes = r.notes;
      createdAt = r.createdAt;
      updatedAt = r.updatedAt;
    };
  };

  public func createReservation(
    reservations : List.List<Types.Reservation>,
    nextId : Nat,
    req : Types.CreateReservationRequest,
    userId : Common.UserId,
    now : Common.Timestamp,
  ) : Types.Reservation {
    let r : Types.Reservation = {
      id = nextId;
      date = req.date;
      name = req.name;
      phone = req.phone;
      userId = userId;
      arriveTime = req.arriveTime;
      leaveTime = req.leaveTime;
      guestCount = req.guestCount;
      notes = req.notes;
      createdAt = now;
      var updatedAt = now;
    };
    reservations.add(r);
    r;
  };

  public func updateReservation(
    reservations : List.List<Types.Reservation>,
    req : Types.UpdateReservationRequest,
    now : Common.Timestamp,
  ) : Bool {
    switch (reservations.find(func(r) { r.id == req.id })) {
      case null { false };
      case (?r) {
        reservations.mapInPlace(
          func(res) {
            if (res.id == req.id) {
              {
                res with
                date = req.date;
                name = req.name;
                phone = req.phone;
                arriveTime = req.arriveTime;
                leaveTime = req.leaveTime;
                guestCount = req.guestCount;
                notes = req.notes;
                var updatedAt = now;
              };
            } else {
              res;
            };
          }
        );
        true;
      };
    };
  };

  public func deleteReservation(
    reservations : List.List<Types.Reservation>,
    id : Nat,
  ) : Bool {
    let sizeBefore = reservations.size();
    let filtered = reservations.filter(func(r) { r.id != id });
    let sizeAfter = filtered.size();
    if (sizeAfter < sizeBefore) {
      reservations.clear();
      reservations.append(filtered);
      true;
    } else {
      false;
    };
  };

  public func listByDate(
    reservations : List.List<Types.Reservation>,
    date : Types.DateString,
  ) : [Types.ReservationView] {
    let filtered = reservations
      .filter(func(r) { r.date == date })
      .map<Types.Reservation, Types.ReservationView>(toView)
      .toArray();
    filtered.sort(func(a, b) {
      if (a.arriveTime < b.arriveTime) #less
      else if (a.arriveTime == b.arriveTime) #equal
      else #greater;
    });
  };
};
