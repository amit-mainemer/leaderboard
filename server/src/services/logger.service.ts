import chalk from "chalk";
import { NextFunction, Request, Response } from "express";

type LogLevel = "INFO" | "DEBUG" | "WARN" | "ERROR";

class LoggerService {
  private static formatMessage(level: LogLevel, ...messages: any[]): string {
    const timestamp = new Date().toISOString();
    let coloredLevel: string;

    switch (level) {
      case "INFO":
        coloredLevel = chalk.blue(`[INFO]`);
        break;
      case "DEBUG":
        coloredLevel = chalk.magenta(`[DEBUG]`);
        break;
      case "WARN":
        coloredLevel = chalk.yellow(`[WARN]`);
        break;
      case "ERROR":
        coloredLevel = chalk.red(`[ERROR]`);
        break;
      default:
        coloredLevel = `[${level}]`;
    }

    // Join messages: stringify objects, leave strings as is
    const formattedMessages = messages
      .map((msg) =>
        typeof msg === "object" ? JSON.stringify(msg, null, 2) : String(msg)
      )
      .join(" ");

    return `${coloredLevel} ${timestamp} ${formattedMessages}`;
  }

  static info(...messages: any[]): void {
    console.log(this.formatMessage("INFO", ...messages));
  }

  static debug(...messages: any[]): void {
    console.debug(this.formatMessage("DEBUG", ...messages));
  }

  static warn(...messages: any[]): void {
    console.warn(this.formatMessage("WARN", ...messages));
  }

  static error(...messages: any[]): void {
    console.error(this.formatMessage("ERROR", ...messages));
  }

  // Express middleware for logging requests
  static expressLogger(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      const statusColor =
        res.statusCode >= 500
          ? chalk.red
          : res.statusCode >= 400
          ? chalk.yellow
          : chalk.green;

      LoggerService.info(
        `${req.method} ${req.originalUrl} ${statusColor(res.statusCode)} - ${duration}ms`
      );
    });
    next();
  }
}

export default LoggerService;
