export {};

declare global {
  interface Window {
    MercadoPago?: new (publicKey: string, options: { locale: string }) => {
      bricks: () => {
        create: (
          brickName: string,
          containerId: string,
          settings: Record<string, unknown>
        ) => Promise<{ unmount?: () => void }>;
      };
    };
  }
}
