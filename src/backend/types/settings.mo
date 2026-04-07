import Common "common";

module {
  public type DayHours = {
    day : Common.DayOfWeek;
    openTime : Common.MinutesFromMidnight;  // minutes from midnight
    closeTime : Common.MinutesFromMidnight; // minutes from midnight (may exceed 1440 if past midnight)
    isOpen : Bool;
  };

  public type OpenHoursConfig = [DayHours]; // length 7, one per day
};
