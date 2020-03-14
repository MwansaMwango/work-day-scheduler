$(document).ready(() => {
  // get current time
  var currentTime = moment().format("dddd, MMMM D, YYYY.");
  // get current hour
  var currentHour = moment().format("HH");
  //
  $("#currentDay").text(currentTime);
  // main loop to iterate through the elements
  // add time to left side. update color of text area and add listener to save button

  $(".input-group").each(function(index, element) {
    var blockTime = $(this.firstElementChild.firstElementChild);
    console.log(blockTime);

    blockTime.text(
      moment()
        .hour(index + 8)
        .minutes(00)
        .format("hh:mm A")
    ); // Add 8 as working hours are from 8am
    var blockID = moment()
      .hour(index + 8)
      .minutes(00)
      .format("HH"); // Returns the hour digit

    $($(this)).attr("data-value", blockID);
    var blockHour = $(this).data("value");

    // set value of the block text area relative to the input group id
    var blockTextArea = $($(this)[0].children[1]);
    blockTextArea.val(localStorage.getItem(blockHour));

    if (currentHour > blockHour) {
      blockTextArea
        .addClass("bg-secondary text-white")
        .attr("data-value", blockID)
        .attr("id", blockHour + "textArea");
    } else if (currentHour < blockHour) {
      blockTextArea
        .addClass("bg-success text-white")
        .attr("data-value", blockID)
        .attr("id", blockHour + "textArea");
    } else {
      blockTextArea
        .addClass("bg-danger")
        .attr("data-value", blockID)
        .attr("id", blockHour + "textArea");
    }
    // set variable for add event button element
    var blockEventButton = $($(this)[0].children[2].firstElementChild);
    blockEventButton
      .addClass(blockHour + " addEventButton")
      .attr("data-value", blockHour)
      .attr("id", blockHour + "addEventButton");
  });
  //click handler for to add an event
  $(".addEventButton").click(addEvent);

  function addEvent(event) {
    var targetBlockId = $(this).data("value");
    var newText = $("#" + targetBlockId + "textArea")[0].value;

    localStorage.setItem(targetBlockId.toString(), newText);
  }
}); //end of DOM loaded event
