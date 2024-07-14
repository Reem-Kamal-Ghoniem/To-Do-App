import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { getTasks, addTask, updateTask, deleteTask } from '../services/api';

export default function TodoScreen({ route }) {
    const { token } = route.params;
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasks(token);
                setTasks(response.data);
            } catch (error) {
                alert('Failed to fetch tasks.');
            }
        };

        fetchTasks();
    }, []);

    const handleAddTask = async () => {
        try {
            const response = await addTask(token, { title: taskText });
            setTasks([...tasks, response.data]);
            setTaskText('');
        } catch (error) {
            alert('Failed to add task.');
        }
    };

    const handleUpdateTask = async (id) => {
        try {
            const updatedTask = { title: taskText };
            await updateTask(token, id, updatedTask);
            setTasks(tasks.map(task => task.id === id ? { ...task, title: taskText } : task));
            setTaskText('');
        } catch (error) {
            alert('Failed to update task.');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(token, id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            alert('Failed to delete task.');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Task List</Text>
            <TextInput
                style={styles.input}
                placeholder="Add a task"
                value={taskText}
                onChangeText={setTaskText}
            />
            <Button title="Add Task" onPress={handleAddTask} />
            <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text>{item.title}</Text>
                        <Button title="Update" onPress={() => handleUpdateTask(item.id)} />
                        <Button title="Delete" onPress={() => handleDeleteTask(item.id)} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
});
