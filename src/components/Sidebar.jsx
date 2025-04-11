import React from "react";

const categories = [
    "All",
    "Technology",
    "Health",
    "Politics",
    "Education",
    "Sports",
    "Entertainment",
    "Science",
    "Travel",
];

const Sidebar = ({ selectedCategory, onCategorySelect, searchTerm, setSearchTerm }) => {
    return (
        <aside className="fixed top-[80px] left-0 h-[calc(100vh-80px)] w-72 bg-white px-5 py-6 border-r border-gray-200 shadow-md z-10 mr-6">
            {/* Search Bar */}
            <div className="relative mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search news..."
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                </span>
            </div>

            {/* Category List */}
            <nav className="flex flex-col gap-3">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onCategorySelect(category)}
                        className={`text-left px-4 py-2 rounded-lg transition ${
                            selectedCategory === category
                                ? "bg-blue-100 text-blue-600 font-semibold"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
