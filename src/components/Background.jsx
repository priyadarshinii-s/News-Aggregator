export default function Background() {
    return (
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-300 via-blue-200 to-white"></div>

            <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#93C5FD" />
                    </linearGradient>
                </defs>

                <line x1="0" y1="100" x2="100%" y2="100" stroke="url(#lineGradient)" strokeWidth="1" />
                <line x1="20%" y1="0" x2="40%" y2="100%" stroke="url(#lineGradient)" strokeWidth="1" />
                <line x1="40%" y1="0" x2="60%" y2="100%" stroke="url(#lineGradient)" strokeWidth="1" />
                <line x1="60%" y1="0" x2="80%" y2="100%" stroke="url(#lineGradient)" strokeWidth="1" />
                <line x1="80%" y1="0" x2="100%" y2="100%" stroke="url(#lineGradient)" strokeWidth="1" />
                <line x1="0" y1="300" x2="100%" y2="300" stroke="url(#lineGradient)" strokeWidth="1" />
                <line x1="0" y1="500" x2="100%" y2="500" stroke="url(#lineGradient)" strokeWidth="1" />
                <line x1="0" y1="700" x2="100%" y2="700" stroke="url(#lineGradient)" strokeWidth="1" />
                <line x1="10%" y1="0" x2="30%" y2="100%" stroke="url(#lineGradient)" strokeWidth="1" />
                <line x1="70%" y1="0" x2="90%" y2="100%" stroke="url(#lineGradient)" strokeWidth="1" />
                <line x1="0" y1="200" x2="100%" y2="200" stroke="url(#lineGradient)" strokeWidth="1" />
                <line x1="0" y1="400" x2="100%" y2="400" stroke="url(#lineGradient)" strokeWidth="1" />
                <line x1="0" y1="600" x2="100%" y2="600" stroke="url(#lineGradient)" strokeWidth="1" />
            </svg>

            <div className="absolute inset-0"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}>
            </div>
        </div>
    );
}