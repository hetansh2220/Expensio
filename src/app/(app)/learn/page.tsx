"use client";

import Link from "next/link";
import Image from "next/image";
import { articles } from "@/lib/constants/learningContent";
import {
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineChartPie,
  HiOutlineShieldCheck,
  HiOutlineCreditCard,
  HiOutlineBanknotes,
  HiOutlineScale,
} from "react-icons/hi2";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  "chart-bar": HiOutlineChartBar,
  "chart-pie": HiOutlineChartPie,
  "shield": HiOutlineShieldCheck,
  "credit-card": HiOutlineCreditCard,
  "banknotes": HiOutlineBanknotes,
  "scale": HiOutlineScale,
};

const iconColorMap: Record<string, string> = {
  "chart-bar": "text-primary bg-primary/15",
  "chart-pie": "text-needs bg-needs/15",
  "shield": "text-savings bg-savings/15",
  "credit-card": "text-emi bg-emi/15",
  "banknotes": "text-success bg-success/15",
  "scale": "text-accent bg-accent/15",
};

export default function LearnPage() {
  return (
    <div className="py-6 animate-fade-in">
      <h1 className="text-xl font-bold font-(family-name:--font-display) mb-1">Financial Learning</h1>
      <p className="text-sm text-muted mb-8">Build your financial knowledge one article at a time</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 stagger">
        {articles.map((article) => {
          const IconComponent = iconMap[article.icon] || HiOutlineChartBar;
          const iconColors = iconColorMap[article.icon] || "text-primary bg-primary/15";
          
          return (
            <Link
              key={article.slug}
              href={`/learn/${article.slug}`}
              className="card card-glow overflow-hidden block group"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                <div className={`absolute bottom-3 left-3 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${iconColors}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="text-sm text-muted mt-1 line-clamp-2 leading-relaxed">{article.summary}</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <HiOutlineClock className="w-3.5 h-3.5 text-muted" />
                  <span className="text-xs text-muted">{article.readTimeMinutes} min read</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
