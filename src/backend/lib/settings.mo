import Map "mo:core/Map";
import Types "../types/settings";
import Common "../types/common";

module {
  func dayToOrder(d : Common.DayOfWeek) : Nat {
    switch d {
      case (#mon) 0;
      case (#tue) 1;
      case (#wed) 2;
      case (#thu) 3;
      case (#fri) 4;
      case (#sat) 5;
      case (#sun) 6;
    };
  };

  func dayCompare(a : Common.DayOfWeek, b : Common.DayOfWeek) : { #less; #equal; #greater } {
    let na = dayToOrder(a);
    let nb = dayToOrder(b);
    if (na < nb) #less
    else if (na == nb) #equal
    else #greater;
  };

  public func setDayHours(
    openHours : Map.Map<Common.DayOfWeek, Types.DayHours>,
    dayHours : Types.DayHours,
  ) {
    openHours.add(dayCompare, dayHours.day, dayHours);
  };

  public func getAllOpenHours(
    openHours : Map.Map<Common.DayOfWeek, Types.DayHours>,
  ) : [Types.DayHours] {
    let allDays : [Common.DayOfWeek] = [#mon, #tue, #wed, #thu, #fri, #sat, #sun];
    allDays.filterMap<Common.DayOfWeek, Types.DayHours>(
      func(day) { openHours.get(dayCompare, day) }
    );
  };
};
