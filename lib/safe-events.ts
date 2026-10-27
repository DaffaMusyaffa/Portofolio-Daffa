import { events as createPointerEvents } from '@react-three/fiber';

// Event manager default R3F, tapi abaikan connect ke target null.
// Terjadi kalau <Canvas> di-unmount sebelum selesai dibuat (mis. hover cepat),
// yang memicu "Cannot read properties of null (reading 'addEventListener')".
export const safeEvents: typeof createPointerEvents = (store) => {
  const manager = createPointerEvents(store);
  const connect = manager.connect;
  return {
    ...manager,
    connect: (target) => {
      if (target) connect?.(target);
    },
  };
};
