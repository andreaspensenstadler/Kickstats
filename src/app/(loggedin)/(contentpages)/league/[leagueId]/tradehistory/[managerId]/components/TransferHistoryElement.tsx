import useSWR from "swr";
import { getFetcherSWR } from "@/misc/KickbaseAPIRequester";
import useLocalStorage from "use-local-storage";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TransferHistoryElement({
  leagueId,
  playerId,
  buyValue,
  sellValue,
}: {
  leagueId: string;
  playerId: string;
  buyValue: string;
  sellValue: string;
}) {
  const [token, setToken] = useLocalStorage("token", ""); //token for api requests
  const router = useRouter();
  const {
    data: playerData,
    error: playerError,
    isLoading: playerIsLoading,
  } = useSWR(
    [`/leagues/${leagueId}/players/${playerId}`, token],
    getFetcherSWR
  );
  if (playerError) {
    return <div>Error while fetching data</div>;
  }
  if (playerIsLoading) {
    return <div>Loading PlayerData</div>;
  }
  return (
    <button
      onClick={() => {
        router.push(`/league/${leagueId}/player/${playerData.id}`);
      }}
    >
      <div className="flex justify-between items-center gap-1 border border-gray-300 py-0.5 rounded-md max-w-100%">
        {/* player picture */}
        <Image
          className={playerData.profileBig ? "self-end" : "mx-3"}
          src={
            playerData.profileBig ? playerData.profileBig : "/nopicture.webp"
          }
          width={playerData.profileBig ? 72 : 48}
          height={playerData.profileBig ? 72 : 48}
          alt=""
        />
        {/* player name*/}
        <div className="flex flex-col items-start overflow-hidden text-left">
          {playerData.knownName ? (
            <p className="text-md mt-3">
              {playerData.knownName ? playerData.knownName : ""}
            </p>
          ) : (
            <div>
              <p className="text-xs">
                {playerData.firstName ? playerData.firstName : ""}
              </p>
              <p className="text-md">
                {playerData.lastName ? playerData.lastName : ""}
              </p>
            </div>
          )}
        </div>
        {/* buy and sell price */}
        <div className="flex flex-col items-center justify-center text-left shrink-0 ml-auto">
          {/* buy price */}
          <div className="flex items-center justify-center">
            <p className="text-xs">B:</p>
            <p className="text-md">
              {new Intl.NumberFormat("de-DE").format(+buyValue)}€
            </p>
          </div>
          {/* sell price */}
          <div className="flex items-center justify-center">
            <p className="text-xs">S:</p>
            <p className="text-md">
              {new Intl.NumberFormat("de-DE").format(+sellValue)}€
            </p>
          </div>
        </div>
        {/* vertical line */}
        <div className="border-l border-gray-300 h-10"></div>
        {/* profit */}
        <p
          className={
            +sellValue - +buyValue < 0
              ? "text-red-600 ml-auto"
              : "text-green-600 ml-auto"
          }
        >
          {new Intl.NumberFormat("de-DE").format(+sellValue - +buyValue)}€
        </p>
      </div>
    </button>
  );
}