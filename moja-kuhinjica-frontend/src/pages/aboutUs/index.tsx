import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { Footer } from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import { QuestionLabel } from '@/components/label/QuestionLabel'
import { TabButton } from '@/components/button/TabButton'
import styles from './AboutUs.module.scss'
import aboutUsPic from '../../../public/static/assets/images/aboutUs.png'
const AboutUs = () => {
    const [active, setActive] = useState<number>(1)
    return (
        <div className={styles.colDiv}>
            <div className={styles.wrapper}></div>
            <label className={styles.title}>DUNDA</label>
            <Header type="main" selectedButton={3} />
            <div className={styles.menuRowDiv}>
                <TabButton
                    active={active === 1}
                    onClick={() => setActive(1)}
                    content="O nama"
                />
                <TabButton
                    active={active === 2}
                    onClick={() => setActive(2)}
                    content="FAQ"
                />
                <TabButton
                    active={active === 3}
                    onClick={() => setActive(3)}
                    content="Politika privatnosti"
                />
                <TabButton
                    active={active === 4}
                    onClick={() => setActive(4)}
                    content="Uslovi korišćenja"
                />
            </div>
            <div className={styles.tabWrapper}>
                {active === 1 && (
                    <div className={styles.aboutUsContainer}>
                        <div className={styles.aboutUs}>
                            <Image src={aboutUsPic} alt="" />
                            <div className={styles.content}>
                                <label className={styles.contentTitle}>
                                    Lorem ipsum?
                                </label>
                                <label className={styles.contentText}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nullam mi elit, commodo nec
                                    ante id, ornare efficitur dui. Nullam mi
                                    elit, commodo nec ante id, ornare effiLorem
                                    ipsum dolor sit amet, consectetur adipiscing
                                    elit. Nullam mi elit, commodo nec ante id,
                                    ornare efficitur dui.
                                </label>
                            </div>
                        </div>
                    </div>
                )}
                {active === 2 && (
                    <div className={styles.FAQContainer}>
                        <QuestionLabel
                            question="Lorem ipsum?"
                            answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mi elit, commodo nec ante id, ornare efficitur dui. Nullam mi elit, commodo nec ante id, ornare efficitur dui. Nulla in quam sed ex aliquam feugiat. In varius risus est.  "
                        />
                        <QuestionLabel
                            question="Lorem ipsum dolor sit?"
                            answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mi elit, commodo nec ante id, ornare efficitur dui. Nullam mi elit, commodo nec ante id, ornare efficitur dui. Nulla in quam sed ex aliquam feugiat. In varius risus est.  "
                        />
                        <QuestionLabel
                            question="Lorem ipsum dolor sit amet?"
                            answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mi elit, commodo nec ante id, ornare efficitur dui. Nullam mi elit, commodo nec ante id, ornare efficitur dui. Nulla in quam sed ex aliquam feugiat. In varius risus est.  "
                        />
                        <QuestionLabel
                            question="Lorem ipsum?"
                            answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mi elit, commodo nec ante id, ornare efficitur dui. Nullam mi elit, commodo nec ante id, ornare efficitur dui. Nulla in quam sed ex aliquam feugiat. In varius risus est.  "
                        />
                    </div>
                )}
                {active === 3 && (
                    <div className={styles.privacyContainer}>
                        <label className={styles.redTitle}>
                            DUNDA Obaveštenje o privatnosti
                        </label>
                        <label className={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vivamus quis dolor nec dui auctor lobortis. Ut
                            placerat velit eu placerat molestie. Suspendisse
                            auctor quis quam in semper. Sed ornare laoreet
                            vulputate. Cras sed placerat elit, vitae mattis
                            sapien. Mauris a ex eu eros tempor congue. Sed eget
                            lacinia massa, sit amet ullamcorper erat. Nam
                            elementum dui ut ante porta venenatis at a dolor.
                            Proin vestibulum felis non aliquet posuere. Donec
                            quis pharetra odio. Sed rhoncus tellus leo, in
                            elementum turpis iaculis ac. Nullam ut magna felis.
                            Sed egestas dui id eleifend ullamcorper. Curabitur
                            nisi lorem, bibendum et eleifend et, gravida et
                            erat. Maecenas ac varius ipsum. Nullam blandit enim
                            leo, a tristique justo scelerisque sit amet. Sed dui
                            dolor, convallis id elementum non, mollis eget
                            massa. Proin et egestas nisi. Donec feugiat nibh
                            quis arcu rutrum efficitur. Nam eget venenatis odio,
                            at mattis lectus. Donec commodo id metus a
                            tristique. Vestibulum at dui quis risus
                        </label>
                    </div>
                )}
                {active === 4 && (
                    <div className={styles.privacyContainer}>
                        <label className={styles.redTitle}>
                            DUNDA Uslovi korišćenja
                        </label>
                        <label className={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vivamus quis dolor nec dui auctor lobortis. Ut
                            placerat velit eu placerat molestie. Suspendisse
                            auctor quis quam in semper. Sed ornare laoreet
                            vulputate. Cras sed placerat elit, vitae mattis
                            sapien. Mauris a ex eu eros tempor congue. Sed eget
                            lacinia massa, sit amet ullamcorper erat. Nam
                            elementum dui ut ante porta venenatis at a dolor.
                            Proin vestibulum felis non aliquet posuere. Donec
                            quis pharetra odio. Sed rhoncus tellus leo, in
                            elementum turpis iaculis ac. Nullam ut magna felis.
                            Sed egestas dui id eleifend ullamcorper. Curabitur
                            nisi lorem, bibendum et eleifend et, gravida et
                            erat. Maecenas ac varius ipsum. Nullam blandit enim
                            leo, a tristique justo scelerisque sit amet. Sed dui
                            dolor, convallis id elementum non, mollis eget
                            massa. Proin et egestas nisi. Donec feugiat nibh
                            quis arcu rutrum efficitur. Nam eget venenatis odio,
                            at mattis lectus. Donec commodo id metus a
                            tristique. Vestibulum at dui quis risus
                        </label>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default AboutUs