import type { NextPage } from "next";
import { useState } from "react";

export default function CheckBox() {
    return (
       <>
        <div className="flex mx-auto">
            <input
            // id={item.id}
            type="checkbox"
            // defaultChecked={item.checked}
            // disabled={item.disabled}
        />
        <p>GPT</p>
        </div>
      </> 
    );
}