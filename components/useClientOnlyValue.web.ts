import { useSyncExternalStore } from 'react';

const semMudanca = () => () => {};

// `useSyncExternalStore` com `getServerSnapshot` só rova no servidor,
// então é seguro determinar se estamos no cliente sem efeito colateral.
export function useClientOnlyValue<S, C>(server: S, client: C): S | C {
  const noCliente = useSyncExternalStore(
    semMudanca,
    () => true,
    () => false,
  );

  return noCliente ? client : server;
}
