import React, { Dispatch, Key, SetStateAction, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { SelectOption } from "../../types/bets";

interface Props {
  options: SelectOption[];
  selected?: SelectOption;
  setSelected?: Dispatch<SetStateAction<SelectOption | undefined>>;
}

export const Select: React.FC<Props> = ({ options, selected, setSelected }) => {
  console.log("selected: ", selected);
  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={setSelected}>
          <div className="space-y-2">
            {options.map((option, idx) => (
              <RadioGroup.Option
                key={idx}
                value={option}
                className={({ active, checked }) => {
                  return `${active ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md`;
                }}
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${active ? "text-white" : "text-gray-900"}`}
                          >
                            {option.label}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${active ? "text-sky-100" : "text-gray-500"}`}
                          >
                            <span>{option.stat}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {active && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

const CheckIcon = (props: any) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
