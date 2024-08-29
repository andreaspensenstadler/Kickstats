"use client";

import { useState, useEffect, Suspense } from "react";
import useLocalStorage from "use-local-storage";

import { getFetcherSWR } from "../../../../../../misc/KickbaseAPIRequester";
import ManagerDropdownMenu from "./ManagerDropdownMenu";
import useSWR from "swr";
import PlayerTableElement from "./PlayerTableElement";

export default function LiveTable({ leagueId }: { leagueId: string }) {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [token, setToken] = useLocalStorage("token", "");
  const [livePlayerId, setLivePlayerId] = useState(userId);
  const {
    data: livePlayers,
    error,
    isLoading,
  } = useSWR([`/leagues/${leagueId}/live`, token], getFetcherSWR);
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (isLoading) {
    return <div>Loading...LiveTable Component</div>;
  }
  return (
    <>
      <ManagerDropdownMenu
        setLivePlayerId={setLivePlayerId}
        livePlayerId={livePlayerId}
        leagueId={leagueId}
      />
      <h2 className="text-2xl">Live Points</h2>
      <div className="flex flex-col gap-0.5 max-w-100%">
        {livePlayers.u
          .find((obj: any) => obj.id === livePlayerId)
          .pl.sort((a: any, b: any) => {
            if (Number(a.t) < Number(b.t)) return 1;
          })
          .map(
            // get "u" list, find the object with the id of the current user, get the "pl" list and sort it by points
            (player: object) => {
              if (player)
                return (
                  <PlayerTableElement liveData={player} leagueId={leagueId} />
                );
            }
          )}
        <div className="flex justify-end items-center text-xl py-1">
          <p className="px-18 mr-auto">Gesamt:</p>
          <p className="pr-5">187</p>
        </div>
      </div>
    </>
  );
}
