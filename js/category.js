var launchYearFilter, launchFilter, landingFilter;

$(document).ready(function () {
  getData();

  $(document).on("click", ".LaunchYearBlk .SubList a", function (e) {
    $(".LandingBlk .SubList a").removeClass("active");
    $(".LaunchBlk .SubList a").removeClass("active");
    $(".LaunchYearBlk .SubList a").removeClass("active");
    $(this).toggleClass("active");
    launchYearFilter = $(this).text();

    getData(launchYearFilter, launchFilter, landingFilter);
  });

  $(document).on("click", ".LaunchBlk .SubList a", function (e) {
    $(".LandingBlk .SubList a").removeClass("active");
    $(".LaunchBlk .SubList a").removeClass("active");
    $(".LaunchYearBlk .SubList a").removeClass("active");
    $(this).toggleClass("active");
    launchFilter = $(this).attr("data-value");

    getData(launchYearFilter, launchFilter, landingFilter);
  });
  $(document).on("click", ".LandingBlk .SubList a", function (e) {
    $(".LandingBlk .SubList a").removeClass("active");
    $(".LaunchBlk .SubList a").removeClass("active");
    $(".LaunchYearBlk .SubList a").removeClass("active");
    $(this).toggleClass("active");
    landingFilter = $(this).attr("data-value");

    getData(launchYearFilter, launchFilter, landingFilter);
  });
});

function getData(launchYearFilter, launchFilter, landingFilter) {
  var url = "https://api.spaceXdata.com/v3/launches?limit=100";
  if (launchYearFilter) {
    url += "&launch_year=" + launchYearFilter;
  }
  if (launchFilter) {
    url += "&launch_success=" + launchFilter;
  }
  if (landingFilter) {
    url += "&land_success=" + landingFilter;
  }
  //("&launch_success=true&land_success=true&launch_year=2014");
  fetch(url)
    .then((res) => res.json())
    .then((out) => {
      var responseData = "";
      $.each(out, function (index, value) {
        responseData =
          responseData +
          '<div class="col-sm-3 col-md-6 MissionDetail "><div class="MissionDetailBlk"><div class="MissionDetailBlk__img text-center"><a class="" href=""><img alt="" src="' +
          value.links.mission_patch +
          '" title="" class=""></a></div><div class="MissionDetailBlk__info"><h2 class="MissionName"><span class="mission_name">' +
          value.mission_name +
          '</span> <span class="flight_number"> #' +
          value.flight_number +
          ' </span></h2><p class="MissionIdSec"><span class="MissionLabel">Mission Ids :</span> <span class="MissionIdList">' +
          value.mission_id +
          '</span></p><p class="MLaunchYearSec"><span class="MissionLabel">Launch Year:</span><span class="MLaunchYear">' +
          value.launch_year +
          '</span></p><p class="MSucLaunchSec"><span class="MissionLabel">Successful Launch:</span><span class="MLaunchYear">' +
          value.launch_success +
          '</span></p><p class="MSucLandingSec"><span class="MissionLabel">Successful Landing:</span><span class="MLaunchYear">' +
          value.rocket.first_stage.cores[0].land_success +
          "</span></p></div></div></div>";

        console.log("Output: ", value);
      });
      $(".SpaceLaunchSec__rightnav").html(responseData);
    })
    .catch((err) => console.error(err));
}
