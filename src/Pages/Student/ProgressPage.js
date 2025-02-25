import "./Styles/ProgressPage.css";
import { PieChart } from "@mui/x-charts/PieChart";
import useSLMSStore from "../../Store/SLMSStore";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProgressPage() {
    const accessToken = useSLMSStore((state) => state.accessToken);
    const id = useSLMSStore((state) => state.id);
    
    const [progress, setProgress] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const getProgress = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/progress/${id}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                if (response.status === 200) {
                    setProgress(response.data);
                } else {
                    alert("Progress fetch failed");
                    console.log("Progress fetch failed:", response.data);
                }
            } catch (error) {
                alert("Error fetching progress");
                console.log("Error fetching progress:", error);
            }
        };

        if (accessToken && id) {
            getProgress();
        }
    }, [accessToken, id]);

    useEffect(() => {
        if (Array.isArray(progress) && progress.length > 0) {
        
            const newGrades = progress.reduce((acc, p) => {
                acc[p.grade] = (acc[p.grade] || 0) + 1;
                return acc;
            }, {});

            
            setData(
                Object.entries(newGrades).map(([grade, count]) => ({
                    id: grade,
                    value: count,
                    label: grade,
                }))
            );
        } else {
            setData([]);
        }
    }, [progress]);

    return (
        <div className="progress-container">
            <h1>Your Progress</h1>
            {data.length > 0 ? (
                <PieChart
                    series={[
                        {
                            data: data,
                        },
                    ]}
                    width={800}
                    height={400}
                />
            ) : (
                <p>No progress available</p>
            )}
        </div>
    );
}
