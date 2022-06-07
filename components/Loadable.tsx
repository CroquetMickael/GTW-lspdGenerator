import { FunctionComponent, PropsWithChildren } from "react";

type LoadableType = {
    isLoading: boolean;
    error: any;
}

export const Loadable: FunctionComponent<PropsWithChildren<LoadableType>> = ({ isLoading, error, children }) => {
    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen text-xl justify-center gap-4 items-center place-content-center">
                <span className="h-16 w-16  block rounded-full border-4 border-t-blue-500 animate-spin"></span>
                <div className="flex items-center justify-center gap-2 text-white">
                    loading...
                </div>
            </div>)
    }

    if (error) {
        return (
            <div className="flex bg-red-400 justify-center items-center mb-4">
                <div className="w-16 bg-red">
                    <div className="p-4">
                        <svg className="h-8 w-8 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M437.019 74.981C388.667 26.629 324.38 0 256 0S123.333 26.63 74.981 74.981 0 187.62 0 256s26.629 132.667 74.981 181.019C123.332 485.371 187.62 512 256 512s132.667-26.629 181.019-74.981C485.371 388.667 512 324.38 512 256s-26.629-132.668-74.981-181.019zM256 470.636C137.65 470.636 41.364 374.35 41.364 256S137.65 41.364 256 41.364 470.636 137.65 470.636 256 374.35 470.636 256 470.636z" fill="#FFF" /><path d="M341.22 170.781c-8.077-8.077-21.172-8.077-29.249 0L170.78 311.971c-8.077 8.077-8.077 21.172 0 29.249 4.038 4.039 9.332 6.058 14.625 6.058s10.587-2.019 14.625-6.058l141.19-141.191c8.076-8.076 8.076-21.171 0-29.248z" fill="#FFF" /><path d="M341.22 311.971l-141.191-141.19c-8.076-8.077-21.172-8.077-29.248 0-8.077 8.076-8.077 21.171 0 29.248l141.19 141.191a20.616 20.616 0 0 0 14.625 6.058 20.618 20.618 0 0 0 14.625-6.058c8.075-8.077 8.075-21.172-.001-29.249z" fill="#FFF" /></svg>
                    </div>
                </div>
                <div className="w-auto text-black opacity-75 items-center p-4">
                    <span className="text-lg font-bold pb-4">
                        Une erreur est survenue !
                    </span>
                    <p className="leading-tight">
                        {error}
                    </p>
                </div>
            </div>)
    }

    return (
        <>
            {children}
        </>);
}