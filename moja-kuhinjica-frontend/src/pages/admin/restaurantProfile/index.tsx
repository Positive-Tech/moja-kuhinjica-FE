import React, { useState } from 'react'
import AdminMenu from '../components/menu/AdminMenu'
import styles from './RestaurantProfile.module.scss'
import { FormInput } from '@/components/input/FormInput'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import homeFillIcon from 'public/static/assets/images/homeFill.svg'
import clockIcon from 'public/static/assets/images/clock-small.svg'
import cameraIcon from 'public/static/assets/images/camera.svg'
import restaurantImage from 'public/static/assets/images/topFood021.png'
import locationIcon from 'public/static/assets/images/location-small.svg'
import phoneIcon from 'public/static/assets/images/phone.svg'
import fileIcon from 'public/static/assets/images/file.svg'
import { FormMultilineInput } from '@/components/input/FormInputMultiline'
import { RestaurantImage } from '../components/image/RestaurantImage'
const RestaurantProfile = ():JSX.Element => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const [images, setImages] = useState<any[]>(
        [{"img": restaurantImage, "id": 1}, 
        {"img": restaurantImage, "id": 2},
        {"img": restaurantImage, "id": 3},
        {"img": restaurantImage, "id": 4},
        {"img": restaurantImage, "id": 5}
    ]
    ) 

    const removeImage = (index: number) => {
        setImages(images.filter((elem, i) => elem.id !== index));
      };

    const onSubmit = (data: any): void => {
        reset()
    }

    return (
        <div>
            <AdminMenu selectedButton={4}/>
            <div className={styles.container}>
                <label className={styles.title}>Profil restorana</label>
                <div className={styles.row}>
                    <div className={styles.column_left}>
                        <label className={styles.sectionTitle}>Opšte informacije restorana</label>
                        <form
                            className={styles.formDiv}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                        <FormInput
                                register={register}
                                errors={errors}
                                name="restaurantName"
                                src={homeFillIcon}
                                placeholder="Ime restorana"
                                type="text"
                                validationSchema={{
                                    required: 'name is required',
                                    pattern: {
                                        value: /[A-Za-z]/,
                                        message: 'invalid name value',
                                    },
                                }}
                                defaultValue="TopFood021"
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                name="workingTime"
                                src={clockIcon}
                                placeholder="Radno vreme"
                                type="text"
                                validationSchema={{
                                    required: 'time is required',
                                    pattern: {
                                        value: /[A-Za-z]/,
                                        message: 'invalid time value',
                                    },
                                }}
                                defaultValue="Ponedeljak-Petak, 12h-15h"
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                name="location"
                                src={locationIcon}
                                placeholder="Adresa restorana"
                                type="text"
                                validationSchema={{
                                    required: 'location is required',
                                    pattern: {
                                        value: /[A-Za-z]/,
                                        message: 'invalid location value',
                                    },
                                }}
                                defaultValue="Svetozara Miletića 26, 21000 Novi Sad"
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                name="phoneNumber"
                                src={phoneIcon}
                                placeholder="Broj telefona"
                                type="text"
                                validationSchema={{
                                    required: 'phone number is required',
                                    pattern: {
                                        value: /[0-9]/,
                                        message: 'invalid phone number value',
                                    },
                                }}
                                defaultValue="0644226471"
                            />
                            <FormMultilineInput
                                src={fileIcon}
                                placeholder="Opis restorana"
                                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mi elit, commodo nec ante id, ornare efficitur dui. Nulla in quam sed ex aliquam feugiat. In varius risus"
                            />
                            <button className={styles.formButton}>
                                Potvrdi izmene
                            </button>
                        </form>
                    </div>
                    <div className={styles.column_right}>
                        <label className={styles.sectionTitle}>Dodaj slike</label>
                        <div className={styles.imagesContainer}>
                            <div className={styles.addImageFrame}>
                                <Image src={cameraIcon} alt="" />
                            </div>
                            { images.map(image => <RestaurantImage image={image} onRemoveImage={removeImage}/>) }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantProfile