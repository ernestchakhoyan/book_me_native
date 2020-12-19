export const dateiOSParser = (date) => {
    const dateToBeParsed = date.split("T");
    const [year,  day, month] = dateToBeParsed[0].split("-");

    return `${year}-${month}-${day}T${dateToBeParsed[1]}`
}