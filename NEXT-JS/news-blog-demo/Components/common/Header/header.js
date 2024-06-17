import Image from "next/image"
import style from '../../../styles/header.module.css'

const Header = () => {

    return (
        <>
            <div className={style.header}>
                <div className="container">
                    <div className={style.logoContainer}>
                        <Image src="data:image/png;base64,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"
                            height={30} width={30} alt="png" className={style.logoImage}></Image>
                      <a href="#default" className={style.logo}>Magazine</a>
                    </div>

                    <div className={style.rightBox}>
                        <p className="opacity-50">728 * 90* ad goes</p>
                    </div>
                </div>
           </div>


        </>

    )
}
export default Header