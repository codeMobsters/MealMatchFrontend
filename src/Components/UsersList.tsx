import { Box, List, ListItem, ListItemButton,  Avatar, CardHeader, Button, Card } from '@mui/material'
import { addNewFollower, deleteFollower } from '../Utils/HelperFunctions';
import { useQuery } from '@tanstack/react-query';
import { User, UserListProps } from '../Utils/Types';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';

const UsersList = (props : UserListProps) => {
    const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
    const {isLoading, isError, data, refetch } = useQuery({
        queryKey: ["listUsers" + (props.queryType && "")],
        queryFn: async () => props.fetchFunction(props.user.token, props.userId, searchTerm)
    });

    const navigate = useNavigate();
    function handleFollow(user: User) {
        if (props.user.followedUserIds){
            if (props.user.followedUserIds.find(id => id == user.userId)) { // unfollow path
                props.setUser({ ...props.user, followedUserIds: props.user.followedUserIds.filter(id => id !== user.userId) });
                deleteFollower(props.user.token, user.userId);
            } else {  // follow path
                props.setUser({ ...props.user, followedUserIds: [...props.user.followedUserIds, user.userId]});
                addNewFollower(props.user.token, {followedUserId: user.userId});
            }
        }
    }

    function handleUserSearch(term: string){
        term == "" 
        ? setSearchTerm(undefined) 
        : setSearchTerm(term);
    }
    
    useEffect(() => {
        refetch();
    }, [searchTerm])
    

    return (
    <Box className="App" sx={{
        minHeight: "100%"
    }}>
        <Box  sx={{
            overflow: "scroll",
            marginTop:  "100px",
            marginBottom: '56px',
            width: "100%"
        }}
        >
            <SearchBar 
            searchbarPlaceholderText='Search users'
            searchType={props.queryType ? props.queryType : "user"}
            handleSearch={handleUserSearch}
            />
            <List>
                {data && data.map((user, index) => 
                    <ListItem disablePadding key={index}>
                        <ListItemButton>
                            <Card
                            sx={{
                                width: "100%",
                                margin: "auto",
                                display: 'grid', gridTemplateColumns: "2fr 1fr",
                              }}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        aria-label="Profile Picture"
                                        src={user.profilePictureUrl}
                                    />
                                }
                                title={user.name}
                                subheader="The recipe master"
                                onClick={() => navigate(`/${user.userId}`)}
                                sx={{
                                flex: 1,
                                margin: 0
                                }}
                            />
                            <Button 
                                color='inherit'
                                aria-label="Follow" 
                                onClick={() => handleFollow(user)}
                            >
                                {props.user.followedUserIds.includes(user.userId)
                                ? <><CancelOutlinedIcon sx={{marginRight: 1}} /> Unfollow</>
                                : <><CheckCircleOutlineOutlinedIcon sx={{marginRight: 1}} /> Follow</>
                            }
                            </Button>
                            </Card>
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </Box>
    </Box>
    )
}

export default UsersList