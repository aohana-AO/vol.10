import { useState } from "react";

export default function CheckBox() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <div className="flex-col mx-auto">
        <div className="flex">
          <input type="checkbox" onChange={handleCheckboxChange} />
          <p>GPT</p>
        </div>
        {isChecked && (
          <>
            <input list="tags" />
            <datalist id="tags">
              <option value="性格1"></option>
              <option value="性格2"></option>
              <option value="性格3"></option>
            </datalist>
          </>
        )}
      </div>
    </>
  );
}
