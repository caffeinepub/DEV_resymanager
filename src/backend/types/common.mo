module {
  public type UserId = Nat;
  public type Timestamp = Int; // nanoseconds (Time.now())
  public type MinutesFromMidnight = Nat; // 0..1439
  public type DayOfWeek = { #mon; #tue; #wed; #thu; #fri; #sat; #sun };
};
