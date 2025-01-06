"use client"
import React from 'react';
import Icon from "@/components/icons/Icon";

const icons = [
    "medal",
    "user",
    "factory",
    "buildings",
    "mapPin",
    "signpost",
    "handshake",
    "listChecks",
    "certificate",
    "knife",
    "grains",
    "calculator",
    "storefront",
    "headset",
    "chatsTeardrop",
    "boardTeacher",
    "planet",
    "arrowLeft",
    "arrowRight",
    "instagram",
    "check",
    "bookmark",
    "hardDrives",
    "browsers",
    "lifebuoy",
    "numberOne",
    "numberTwo",
    "numberThree",
    "x",
    "caretDown",
    "caretUp",
    "desktopTower",
    "gear",
    "wrench",
    "leaf",
    "computerTower",
    "database",
    "checkCircle",
    "twitter",
    "linkedin",
    "youtube",
    "birthday",
    "burger",
    "business",
    "cloudData",
    "club",
    "comptinnov",
    "down",
    "group",
    "lsa",
    "logiviande",
    "merge",
    "silos",
    "stepOne",
    "stepTwo",
    "stepThree",
    "stepFour",
    "team",
    "checklist",
    "listing",
    "poligon",
    "poligonTransparent",
    "triangle",
    "software",
    "support",
    "versioning",
    "adress book",
    "alarm",
    "apple",
    "archive",
    "arrow clockwise",
    "calendar check",
    "chart bar",
    "chart pie",
    "cloud",
    "cloud arrow down",
    "cloud arrow up",
    "cloud Check",
    "code",
    "euro",
    "device mobile",
    "device tablet camera",
    "enveloppe",
    "export",
    "faders",
    "file",
    "file cloud",
    "file code",
    "flag",
    "folder open",
    "folder simple",
    "identification badge",
    "shopping cart",
    "star",
]

const Page = () => {
    return (
        <div className="flex flex-col gap-4">
                {icons.sort().map((icon, index) => (
                    <div key={index} className="flex items-center gap-12">
                        <div className="">
                            {icon} :
                        </div>
                        <Icon name={icon} size={48} />
                    </div>
                ))}
        </div>
    );
};

export default Page;