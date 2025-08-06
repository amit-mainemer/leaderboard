import React, { useState } from "react";
import {
    Paper,
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import { createUser, updateScore } from "../api";
import { GameButton } from "../components/GameButton";
import { Avatar } from "../components/Avatar";
import { useLeaderboard } from "../state/leaderboard.context";
import { useToaster } from "../state/toaster.context";

const MAX_SCORE = 100000000; // 100 million

const UsersContainer = styled(Paper)`
  background: linear-gradient(135deg, #4b0082 0%, #6a0dad 50%, #4b0082 100%);
  color: #fff;
  border-radius: 16px;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 40px;
  position: relative;
  box-shadow: 0 30px 100px rgba(75, 0, 130, 0.9);
  border: 2px solid #ffd700;
`;

const UsersHeader = styled(Box)`
  background-color: #ff8c00;
  padding: 12px 0;
  text-align: center;
  color: white;
  box-shadow: 0 4px 20px rgba(75, 0, 130, 0.3);
  position: absolute;
  top: -20PX;
  left: 0;
  right: 0;
  z-index: 1;
  width: 60%;
  position: absolute;
  left: 20%;
  border-radius: 16px;
`;

const UsersContent = styled(Box)`
  padding: 60px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Users: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [score, setScore] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [action, setAction] = useState<"add" | "remove">("add");
    const [image, setImage] = useState<string>("1.jpg");
 
    const { refreshLeaderboard } = useLeaderboard();
    const { showToast } = useToaster();

    const handleUpdateScore = async () => {
        try{
            await updateScore(userId, amount, action);
            showToast('Score updated successfully!', 'success');
        } catch (ex) {
            console.error(ex)
        }
    }

    const handleCreateUser = async () => {
        try {
            await createUser(name, score, image);
            await refreshLeaderboard();
            showToast('User created successfully!', 'success');
        } catch (ex) {
            console.error(ex);
            showToast('Failed to create user. Please try again.', 'error');
        } finally {
            setName("");
            setScore(0);
        }
    }

    return (
        <UsersContainer elevation={6}>
            <UsersHeader>
                <Typography variant="h5" fontWeight="bold">
                    Users Mangement
                </Typography>
            </UsersHeader>

            <UsersContent>
                <Typography variant="h6" fontWeight="bold">Create User</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField sx={{ color: 'white', width: '100%' }} label="User Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField sx={{ color: 'white' }} label="Score" type="number" value={score} onChange={(e) => setScore(Number(e.target.value))} />
                    <FormControl sx={{ width: '180px' }}>
                        <InputLabel id="avatar-label">Avatar</InputLabel>
                        <Select
                        size="small"
                            labelId="avatar-label"
                            label="Avatar"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}>
                            {new Array(5).fill(0).map((_, index) => (
                                <MenuItem value={`${index + 1}.jpg`}>
                                    <Avatar src={`/avatars/${index + 1}.jpg`} />
                                </MenuItem>
                            ))}
                        </Select>

                    </FormControl>

                </Box>
                <GameButton variant="contained" disabled={score > MAX_SCORE} onClick={handleCreateUser}>Create</GameButton>
                <Typography variant="h6" fontWeight="bold">Update User Score</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>

                    <TextField sx={{ color: 'white' }} label="UserId" value={userId} onChange={(e) => setUserId(e.target.value)} />

                    <TextField sx={{ color: 'white' }} label="Amount" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                    <Select value={action} onChange={(e) => setAction(e.target.value as "add" | "remove")} sx={{ color: 'white' }}>
                        <MenuItem value="add">Add</MenuItem>
                        <MenuItem value="remove">Decrease</MenuItem>
                    </Select>
                </Box>
                <GameButton variant="contained" disabled={amount > MAX_SCORE}  onClick={handleUpdateScore}>Update</GameButton>
            </UsersContent>
        </UsersContainer>
    );
};

export default Users; 