const dateConverter = (date) => {
  switch (date) {
    case "MO":
      return "Mon";
    case "TU":
      return "Tue";
    case "WE":
      return "Wed";
    case "TH":
      return "Thu";
    case "FR":
      return "Fri";
    case null:
      return "N/A";
    default:
      return (
        date +
        ": this date is unformatted; please report this to the developer."
      );
  }
};

export { dateConverter };
