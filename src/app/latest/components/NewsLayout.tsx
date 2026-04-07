"use client";

import { useState } from "react";
import { CategoryFilter } from "./CategoryFilter";
import { NewsGrid } from "./NewsGrid";
import { TrendingNews } from "./TrendingNews";

interface NewsLayoutProps {
  initialCategory?: string;
  showCategories?: boolean;
  showSidebar?: boolean;
}

export function NewsLayout({
  initialCategory = "All",
  showCategories = true,
  showSidebar = true,
}: NewsLayoutProps) {
  const [currentCategory, setCurrentCategory] = useState(initialCategory);

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-12 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Latest News
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Stay updated with the latest financial and business news
              </p>
            </div>
          </div>

          {showCategories && (
            <CategoryFilter
              currentCategory={currentCategory}
              onCategoryChange={handleCategoryChange}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className={`${showSidebar ? "lg:grid lg:grid-cols-4 lg:gap-8" : ""}`}
        >
          {/* Main Content */}
          <div className={`${showSidebar ? "lg:col-span-3" : ""}`}>
            <NewsGrid category={currentCategory} />
          </div>

          {/* Sidebar */}
          {showSidebar && (
            <div className="lg:col-span-1 mt-8 lg:mt-0">
              <div className="space-y-8 sticky top-8">
                <TrendingNews />

                {/* Market Summary Widget */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Market Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        S&P 500
                      </span>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          4,567.89
                        </div>
                        <div className="text-xs text-green-600">+1.2%</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        NASDAQ
                      </span>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          14,234.56
                        </div>
                        <div className="text-xs text-green-600">+0.8%</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Bitcoin
                      </span>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          $52,345
                        </div>
                        <div className="text-xs text-red-600">-2.1%</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Market data is delayed by 15 minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
