import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { useMediaQuery } from "@mui/material";

import { Games } from "../Games/Games";
import { Selections } from "../Selections/Selections";

const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ");
};

export const TabView = () => {
  const mobile = useMediaQuery("(max-width:750px)");

  let [categories] = useState({
    Matchups: <Games />,
    Selections: <Selections />
  });

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List
          className={`flex space-x-1 rounded-xl bg-gray-900/20 p-1 ${
            mobile ? "" : "w-[30%]"
          } m-auto`}
        >
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none"
              )}
            >
              {posts}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
