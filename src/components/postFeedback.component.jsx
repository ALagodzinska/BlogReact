import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import styles from "../styles/components/postFeedback.styles";
import { getFeedback } from "../writingAssistant.actions";

function PostFeedback({ content, loading }) {
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);

  const handleGetFeedback = async () => {
    setFeedbackLoading(true);

    try {
      const feedback = await getFeedback(content);
      setFeedbackData(feedback);
      console.log(feedback);
    } catch (error) {
      console.error(error);
    } finally {
      setFeedbackLoading(false);
    }
  };

  return (
    <Box sx={styles.feedbackPanel}>
      <Button
        variant="outlined"
        sx={styles.feedbackButton}
        type="button"
        disabled={loading || feedbackLoading}
        onClick={handleGetFeedback}
      >
        {feedbackLoading && (
          <CircularProgress size={16} thickness={5} sx={styles.buttonSpinner} />
        )}
        {feedbackLoading ? "Getting Feedback..." : "Get Feedback"}
      </Button>
      <Box
        sx={styles.feedbackField}
        role="textbox"
        aria-readonly="true"
        tabIndex={0}
      >
        <Typography sx={styles.feedbackLabel}>Feedback</Typography>
        {feedbackLoading ? (
          <Box sx={styles.loadingFeedback}>
            <LinearProgress sx={styles.feedbackProgress} />
            <Typography sx={styles.loadingText}>
              Reading your post and shaping suggestions...
            </Typography>
          </Box>
        ) : !feedbackData ? (
          <Typography sx={styles.emptyFeedback}>
            Feedback will appear here after you request it.
          </Typography>
        ) : (
          <Box>
            {feedbackData.summary && (
              <Typography sx={styles.summary}>
                {feedbackData.summary}
              </Typography>
            )}
            {Array.isArray(feedbackData.suggestions) &&
              feedbackData.suggestions.length > 0 && (
                <Box sx={styles.suggestions}>
                  <Typography sx={styles.suggestionsTitle}>
                    What to fix
                  </Typography>
                  {feedbackData.suggestions.map((feedbackSuggestion, index) => (
                    <Box
                      sx={styles.suggestionItem}
                      key={`${index}-${feedbackSuggestion.issue}`}
                    >
                      <Typography sx={styles.issue}>
                        {index + 1}. {feedbackSuggestion.issue}
                      </Typography>
                      <Typography sx={styles.suggestionText}>
                        <Box component="span" sx={styles.suggestionLabel}>
                          Suggestion:
                        </Box>{" "}
                        {feedbackSuggestion.suggestion}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PostFeedback;
