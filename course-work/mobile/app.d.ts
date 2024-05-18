/// <reference types="nativewind/types" />

declare module '*.png';
declare module '*.mov';
declare module '*.mp4';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
    }
  }
}

export {};
