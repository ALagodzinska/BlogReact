import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import styles from "../styles/components/postFeedback.styles";
import {
  generateTitles,
  getFeedback,
} from "../services/writingAssistantService";

function PostFeedback({ title, content, loading, onSelectTitle }) {
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [titlesLoading, setTitlesLoading] = useState(false);
  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [assistantError, setAssistantError] = useState("");

  const getAssistantErrorMessage = (error) => {
    if (error.message.includes("429")) {
      return "Too many requests right now. Please wait a moment and try again.";
    }

    return "Something went wrong. Please try again.";
  };

  const handleGetFeedback = async () => {
    setFeedbackData(null);
    setTitleSuggestions([]);
    setAssistantError("");
    setFeedbackLoading(true);

    try {
      const feedback = await getFeedback(content);
      setFeedbackData(feedback);
    } catch (error) {
      console.error(error);
      setAssistantError(getAssistantErrorMessage(error));
    } finally {
      setFeedbackLoading(false);
    }
  };

  const handleGenerateTitles = async () => {
    setFeedbackData(null);
    setTitleSuggestions([]);
    setAssistantError("");
    setTitlesLoading(true);

    try {
      const titlesResponse = await generateTitles(title, content);
      setTitleSuggestions(titlesResponse.titles || []);
    } catch (error) {
      console.error(error);
      setTitleSuggestions([]);
      setAssistantError(getAssistantErrorMessage(error));
    } finally {
      setTitlesLoading(false);
    }
  };

  return (
    <Box sx={styles.feedbackPanel}>
      <Box sx={styles.buttonRow}>
        <Button
          variant="outlined"
          sx={styles.feedbackButton}
          type="button"
          disabled={loading || feedbackLoading}
          onClick={handleGetFeedback}
        >
          {feedbackLoading && (
            <CircularProgress
              size={16}
              thickness={5}
              sx={styles.buttonSpinner}
            />
          )}
          {feedbackLoading ? "Getting Feedback..." : "Get Feedback"}
        </Button>
        <Button
          variant="outlined"
          sx={styles.feedbackButton}
          type="button"
          disabled={loading || titlesLoading}
          onClick={handleGenerateTitles}
        >
          {titlesLoading && (
            <CircularProgress
              size={16}
              thickness={5}
              sx={styles.buttonSpinner}
            />
          )}
          {titlesLoading ? "Generating Titles..." : "Generate Titles"}
        </Button>
      </Box>
      <Box
        sx={styles.feedbackField}
        role="textbox"
        aria-readonly="true"
        tabIndex={0}
      >
        <Typography sx={styles.feedbackLabel}>AI Writing Assistant</Typography>
        {(titlesLoading || titleSuggestions.length > 0) && (
          <Box sx={styles.titleSuggestions}>
            {!titlesLoading && (
              <>
                <Typography sx={styles.suggestionsTitle}>
                  Suggested Titles
                </Typography>
                {titleSuggestions.map((titleSuggestion, index) => (
                  <Button
                    key={`${index}-${titleSuggestion}`}
                    type="button"
                    variant="text"
                    sx={styles.titleSuggestionButton}
                    onClick={() => onSelectTitle(titleSuggestion)}
                  >
                    {titleSuggestion}
                  </Button>
                ))}
              </>
            )}
          </Box>
        )}
        {feedbackLoading || titlesLoading ? (
          <Box sx={styles.loadingFeedback}>
            <LinearProgress sx={styles.feedbackProgress} />
            <Typography sx={styles.loadingText}>
              {feedbackLoading
                ? "Reading your post and shaping suggestions..."
                : "Thinking of some title ideas for your post..."}
            </Typography>
          </Box>
        ) : assistantError ? (
          <Typography sx={styles.errorText}>{assistantError}</Typography>
        ) : !feedbackData && titleSuggestions.length === 0 ? (
          <Typography sx={styles.emptyFeedback}>
            Choose an option above to get writing feedback or generate title
            ideas for this post.
          </Typography>
        ) : feedbackData ? (
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
        ) : null}
      </Box>
    </Box>
  );
}

export default PostFeedback;
