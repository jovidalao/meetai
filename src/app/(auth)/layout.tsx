interface Props {
    children: React.ReactNode
};

const Layout = ({ children }: Props) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-2/3">
                {children}
            </div>
        </div>
    )
}

export default Layout;