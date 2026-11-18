"use client"
import { Avatar, AvatarGroup } from '@chakra-ui/react'
import React from 'react'
import UserImage from './userImage';
import { formatNumberWithK } from '@/helpers/utils/formatNumberWithK';
import { IUser } from '@/helpers/models/user';

interface Props {
    users: IUser[],
    count: number
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl",
}

function InterestedUsers(props: Props) {
    const {
        users,
        count,
        size,
    } = props

    console.log("Events", event);


    return (
        <>
            {users?.length > 0 && (
                <AvatarGroup gap="0" spaceX="-3" size="lg">
                    {users?.map((item: any, index: number) => {
                        if (index <= 3) {
                            return (
                                <UserImage size={size ?? "xs"} user={item} />
                            )
                        }
                    })}
                    {count >= 4 &&
                        <Avatar.Root size={size ?? "xs"} rounded={"full"} roundedTopRight={"0px"} variant="solid">
                            <Avatar.Fallback>{"+" + formatNumberWithK(count - 3)}</Avatar.Fallback>
                        </Avatar.Root>
                    }
                </AvatarGroup>
            )}
        </>
    )
}

export default InterestedUsers
