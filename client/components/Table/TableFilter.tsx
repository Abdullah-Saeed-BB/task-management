"use client";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

type Props = {
  filter: { label: string; name: string; logic: { [key: string]: boolean } };
  setItems: Function;
  data: Object[];
};

function TableFilter({ filter, setItems, data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [checkboxs, setCheckboxs] = useState(filter.logic);

  useEffect(() => {
    const checkList: string[] = [];

    for (let checkbox in checkboxs) {
      if (!checkboxs[checkbox]) checkList.push(checkbox);
    }

    const updatedItems = data.filter(
      (item: any) => checkList.indexOf(item[filter.name]) === -1
    );

    setItems(updatedItems);
  }, [checkboxs, data, filter.name, setItems]);

  const handleOnChange = (key: string) => {
    setCheckboxs({ ...checkboxs, [key]: !checkboxs[key] });
  };

  return (
    <div className="relative">
      <button
        className="bg-slate-200 text-slate-500 py-2 w-28 rounded-md px-3 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm uppercase">{filter.label}</span>
        {isOpen ? (
          <FontAwesomeIcon icon={faAngleDown} />
        ) : (
          <FontAwesomeIcon icon={faAngleUp} />
        )}
      </button>
      {isOpen && (
        <div className="absolute px-2 min-w-36 bg-white shadow-md flex flex-col">
          {Object.keys(checkboxs).map((key: string) => (
            <label key={key} className="py-1 space-x-3">
              <input
                className=""
                type="checkbox"
                checked={checkboxs[key]}
                onChange={() => handleOnChange(key)}
              />
              <span>{key}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default TableFilter;
