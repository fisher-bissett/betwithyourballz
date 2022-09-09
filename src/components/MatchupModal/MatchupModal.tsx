import React, { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Grid } from "@mui/material";
import format from "date-fns/format";

// import EspnLogo from "../../assets/espn-logo.png";
import { TeamInfo } from "./TeamInfo";
import { Select } from "./Select";
import { MatchupInfo } from "./MatchupInfo";
import { Event, Odds } from "../../types/types";

interface Props {
  event: Event;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const MatchupModal: React.FC<Props> = ({ event, isOpen, setIsOpen }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const getSpread = (odds: Odds) => {
    if (odds.awayTeamOdds.underdog) {
      return `${odds.awayTeamOdds.team.abbreviation} +${Math.abs(odds.spread).toFixed(1)}`;
    } else if (odds.homeTeamOdds.underdog) {
      return `${odds.homeTeamOdds.team.abbreviation} +${Math.abs(odds.spread).toFixed(1)}`;
    } else return "";
  };

  const options = [
    {
      name: "Favorite",
      stat: event.odds.details
    },
    {
      name: "Underdog",
      stat: getSpread(event.odds)
    },
    {
      name: "Over",
      stat: `${event.odds.overUnder} ↑`
    },
    {
      name: "Under",
      stat: `${event.odds.overUnder} ↓`
    }
  ];

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-3xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all"
                  style={{
                    backgroundImage: `linear-gradient(to right, #${event.competitors[1].color} , #${event.competitors[0].color})`
                  }}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white flex justify-center"
                  >
                    {`${format(new Date(event.date), "ccc PPp")} CT`}
                  </Dialog.Title>
                  {/* MAIN CONTENT */}
                  <Grid container className="rounded-2xl mt-8">
                    <Grid item xs={4}>
                      <TeamInfo team={event.competitors[1]} />
                    </Grid>
                    <Grid item xs={4}>
                      <MatchupInfo event={event} />
                    </Grid>
                    <Grid item xs={4}>
                      <TeamInfo team={event.competitors[0]} />
                    </Grid>
                  </Grid>
                  <div className="flex justify-center my-2">
                    <a href={event.link} target="_blank">
                      <button
                        type="button"
                        className="inline-flex gap-2 items-center justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-400 focus:outline-none focus:ring-0"
                        onClick={() => {}}
                      >
                        <span className="italic">View on</span>
                        <span>
                          <img src={"#"} className="h-3" />
                        </span>
                      </button>
                    </a>
                  </div>

                  <div className="flex">
                    <Select options={options} />
                  </div>

                  <div className="mt-2 flex justify-around"></div>
                  <div className="flex justify-between">
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium hover:bg-red-400 focus:outline-none"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-200 px-4 py-2 text-sm font-medium hover:bg-green-400 focus:outline-none"
                        onClick={closeModal}
                      >
                        Place Bet
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
