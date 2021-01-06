library("tidyverse")
library("ggthemes")
library("Cairo")

votes = read.csv("../ProxyVoting/VoteDataNew.csv")
votesold = read.csv("votesC.csv") %>%
  select(!vote) %>%
  pivot_longer(!date, names_to = "party") %>%
  mutate(
    party = ifelse(party == "cons", "Conservative", party),
    party = ifelse(party == "SNP", "Scottish National Party", party),
    party = ifelse(party == "labour", "Labour", party),
    date = as.Date(date, "%d/%m/%Y")
  ) %>%
  rename(
    partytotal = value
  )

coalesce_by_column <- function(df) {
  return(coalesce(df[1], df[2]))
}


votes <- votes %>%
  mutate(
    name = gsub("\\([^\\]]*\\)", "", name, perl=TRUE)
  ) %>%
  mutate_all(function(x) ifelse(x == "False",NA, x)) %>%
  mutate_all(function(x) ifelse(x == "",NA, x)) %>%
  group_by(name) %>%
  summarise_all(coalesce_by_column) %>%
  mutate_all(function(x) ifelse(x == "True",1, x)) %>%
  mutate_all(function(x) ifelse(is.na(x),0, x)) %>%
  pivot_longer(!c(name, party, twitter), names_to = "date", values_to="count") %>%
  mutate(
    count = as.double(count),
    party = ifelse(party != "Conservative" & party != "Labour" & party != "Scottish National Party", "Other", party)
  ) %>%
  group_by(date, party) %>%
  summarise(partytotal = sum(count)) %>%
  subset(
    party != "False1" & party != "PC" & party != "Other"
  ) %>%
  mutate(
    date = substring(date, 2),
    date = as.Date(date, "%Y.%m.%d")
  ) 

votes1 <- rbind(votes, votesold) %>%
  pivot_wider(names_from = party, values_from = partytotal) %>%
  rename(
    snp = "Scottish National Party"
  )




ggplot(votes1) +
  geom_ribbon(aes(x=date, ymin=(snp + Labour), ymax=(Conservative + snp + Labour), fill = "Conservative"), alpha=1) +
  geom_ribbon(aes(x=date, ymin=snp, ymax=snp + Labour, fill = "Labour"), alpha=1) +
  geom_ribbon(aes(x=date, ymin=0, ymax=snp, fill = "Scottish National Party"), alpha=1) +
  scale_fill_manual(name="Votes paired with party whip", values=c("#3145FA", "#D63D09", "#EDD815")) +
  xlab("Date") +
  ylab("Members eliglbe for Proxy Votes") +
  annotate("segment", x = min(votes1$date), xend = min(votes1$date), y = 0, yend = 200,
           colour = "black", lty="dashed") +
  annotate("text", x = as.Date("2020-08-15"), y = 175, label = "MPs allowed proxy votes due to pandemic") +
  theme_pander()
  





write.csv(allvotes, "votesT.csv", row.names=FALSE)