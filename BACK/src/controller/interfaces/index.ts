import { Request, Response } from "express";

export interface IControllerInput extends Request {}
export interface IControllerOutput extends Response {}
