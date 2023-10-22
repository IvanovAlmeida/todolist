export class DateUtils {
  static parseToDate(dateString: string): Date {
    const date = new Date(dateString);
    const utcTime = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    return new Date(utcTime);
  }
}
