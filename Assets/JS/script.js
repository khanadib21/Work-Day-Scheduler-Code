$(function() {
    var businessHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
  
    for (var i = 0; i < businessHours.length; i++) {
      var hour = i + 9;
      var timeBlock = $("<div>").attr("id", "hour-" + hour).addClass("row time-block");
      var hourCol = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(businessHours[i]);
      var descriptionCol = $("<textarea>").addClass("col-8 col-md-10 description");
      var saveBtnCol = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save")
        .append($("<i>").addClass("fas fa-save").attr("aria-hidden", "true"));
  
      timeBlock.append(hourCol, descriptionCol, saveBtnCol);
      $(".container-fluid").append(timeBlock);
    }
  
    $(".saveBtn").on("click", function() {
      var hour = $(this).parent().attr("id");
      var eventText = $(this).siblings(".description").val();
      localStorage.setItem(hour, eventText);
    });
  
    function updateHourlyStatus() {
      var currentHour = dayjs().hour();
      $(".time-block").each(function() {
        var blockHour = parseInt($(this).attr("id").split("-")[1]);
        if (blockHour < currentHour) {
          $(this).addClass("past").removeClass("present future");
        } else if (blockHour === currentHour) {
          $(this).addClass("present").removeClass("past future");
        } else {
          $(this).addClass("future").removeClass("past present");
        }
      });
    }
  
    $(".time-block").each(function() {
      var hour = $(this).attr("id");
      var savedEvent = localStorage.getItem(hour);
      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  
    setInterval(updateHourlyStatus, 60000);
  
    updateHourlyStatus();
  });
