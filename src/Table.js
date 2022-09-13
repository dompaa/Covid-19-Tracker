import React from 'react';
import numeral from "numeral";
import './Table.css';

function Table({ countries }) {
    return (
        <div className="table">
            {countries.map(({ country, cases }) => ( /*go through all the countries, map through them for every single country return the follwing code:  */
                <tr>
                    {<td>{country}</td> /* we deconstructed instead of country.country here into single country  */}
                    <td>
                        <strong>{numeral(cases).format("0,0")}</strong>
                    </td>
                </tr>
            ))}
        </div>
    );
}
export default Table;
