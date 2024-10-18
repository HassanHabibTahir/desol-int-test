import { Request, Response, NextFunction } from 'express';

export const serverError = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (!err.status) {
    console.error(err.stack);
  }
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error' });

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val: any) => val.message);
    res.status(500).json({ message: message || 'Internal Server Error' });
  }
};

export const catchAsync =
  (
    handler: (req: Request, res: Response, next: NextFunction) => Promise<any>,
  ) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const result = handler(req, res, next);

      try {
        return await result;
      } catch (error:any) {
        if (error?.name === 'ValidationError') {
          const message = Object.values(error?.errors).map(
            (val: any) => val?.message,
          );
          return res.status(422).json({
            message: message ? message[0] : '',
          });
        }
        next(error);
      }
    } catch (err) {
      next(err);
    }
  };
