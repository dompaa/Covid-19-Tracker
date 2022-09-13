import React from 'react'; // rfce react functional component with the export
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, isRed, active, total, ...props }) {
    return (
        <Card
            onClick={props.onClick}
            className={`infoBox ${active && 'infoBox--selected'} ${isRed && "infoBox--red"
            }`}
            >
            {/* in BEM this (infoBox--selected) stands for modification of the element, while infoBox__title stands for element change */}
            <CardContent>
                {/* Title i.e Coronavirus cases */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                {/* Number of cases */}
                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
                {/* if it's not red then add infoBox__cases--green */}
                {/* 1.2M total */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
