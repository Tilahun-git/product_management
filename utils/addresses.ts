import {Mail, MapPin, Phone } from "lucide-react";
import { LucideIcon } from "lucide-react";

export type FooterInfoItem = {
  icon: LucideIcon;
  title: string;
  value: string;
};

export const addresses: FooterInfoItem[] = [
  { icon: MapPin, title: "Visit Us", value: "Lalibela" },
  { icon: Phone, title: "Call Us", value: "+251988888" },
  { icon: Mail, title: "Email Us", value: "lalibela@gmail.com" },
];
