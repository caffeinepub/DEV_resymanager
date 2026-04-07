import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import SettingsLib "../lib/settings";
import Types "../types/settings";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  openHours : Map.Map<Common.DayOfWeek, Types.DayHours>,
) {
  /// Admin only — set open hours for a specific day of the week.
  public shared ({ caller }) func setDayHours(dayHours : Types.DayHours) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can set open hours");
    };
    SettingsLib.setDayHours(openHours, dayHours);
  };

  /// Any authenticated user — get open hours for all days.
  public query ({ caller }) func getAllOpenHours() : async [Types.DayHours] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view open hours");
    };
    SettingsLib.getAllOpenHours(openHours);
  };
};
