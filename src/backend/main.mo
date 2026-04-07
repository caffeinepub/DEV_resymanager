import List "mo:core/List";
import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import UserTypes "types/users";
import SettingsTypes "types/settings";
import ReservationTypes "types/reservations";
import Common "types/common";
import UsersApi "mixins/users-api";
import SettingsApi "mixins/settings-api";
import ReservationsApi "mixins/reservations-api";

actor {
  // -- Authorization --
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // -- Users domain state --
  let users = List.empty<UserTypes.User>();
  include UsersApi(accessControlState, users);

  // -- Settings domain state --
  let openHours = Map.empty<Common.DayOfWeek, SettingsTypes.DayHours>();
  include SettingsApi(accessControlState, openHours);

  // -- Reservations domain state --
  let reservations = List.empty<ReservationTypes.Reservation>();
  include ReservationsApi(accessControlState, users, reservations);
};
