import { useCallback, useState } from "react";
import { useAccount } from "wagmi";
import { Delegate } from "~/types/delegate";

export const useDelegateSelector = () => {
  const { address } = useAccount();
  const [selectedDelegate, setSelectedDelegate] = useState<Delegate | null>(
    null,
  );

  const onDelegateSelect = useCallback((delegate: Delegate) => {
    setSelectedDelegate(delegate);
  }, []);

  const delegateToMyself = useCallback(
    (onSubmit: () => void) => {
      onDelegateSelect({
        account: {
          address: address,
          bio: "",
          name: "",
          picture: "",
          twitter: "",
          ens: "",
        },
        delegatorsCount: 0,
        id: "",
        votesCount: "",
        statement: null,
      });

      onSubmit();
    },
    [onDelegateSelect, address],
  );

  return { selectedDelegate, onDelegateSelect, delegateToMyself };
};
