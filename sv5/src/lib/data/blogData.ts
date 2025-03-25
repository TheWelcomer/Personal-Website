// blogData.ts
// This file contains the data for blog posts

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    image?: string;
    tags?: string[];
    author?: {
        name: string;
        avatar?: string;
    };
    featured?: boolean;
}

// Sample blog post data
export const BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        title: 'Book Review: Project Hail Mary',
        excerpt: 'A quick overview of Andy Weir\'s latest science fiction novel "Project Hail Mary"',
        date: '2025-03-19',
        category: 'hobbies',
        image: '/images/hailmary.png',
        tags: ['book review', 'hobbies'],
        author: {
            name: 'Your Name',
            avatar: '/images/hailmary.png'
        },
        featured: false,
        content: `
## If you, like me, are in search of a book with the same great flavor as The Martian, then go read Project Hail Mary.
## Pacing
&nbsp;&nbsp;&nbsp;&nbsp;Overall, The Martian was more consistently paced, whereas Project Hail Mary had higher 
highs and lower lows. Project Hail Mary takes some time to get going, and the story slows down again at the ending 
(although it leads to a very satisfying conclusion). About a third of the way into the book is where Project 
Hail Mary really shines.
## Problem Solving
&nbsp;&nbsp;&nbsp;&nbsp;Project Hail Mary has that same style of structuring the plot around STEM puzzles as the Martian, but feels more Natural
Science focused whereas The Martian felt engineering focused. While Mark Watney would be trying 
to fix or engineer a new gadget, Ryland Grace would be investigating new organisms or materials.
<figure>
    <img src="/images/sattelitesmary.webp" width="300" alt="Satellite Scene in Project Hail Mary">
    <figcaption class="justify-center">Scene from the upcoming Project Hail Mary movie, coming out in 2026!</figcaption>
</figure>
## Characters/Relationships
&nbsp;&nbsp;&nbsp;&nbsp;Where Project Hail Mary really shines is in its characters and their relationships. Mark Watney was an excellent character, but we almost never saw him interacting
with another person and the relationships between the NASA characters felt undeveloped. I was a little worried
Project Hail Mary would go down this route, but it ended up having one of the most genuine relationships I've ever seen 
in a book. <br><br>
&nbsp;&nbsp;&nbsp;&nbsp;I really enjoyed how ethically developed each of the characters was. Like The Martian, the book also lacks a clear villain.
I also enjoyed the complexity of each organism and tool introduced in Project Hail Mary. What seems like
Ryland's worst fear in one moment is his greatest asset in another, and vice versa.
<figure>
    <img src="/images/goslingmary.webp" width="300" alt="Protagonist of Project Hail Mary">
    <figcaption class="justify-center">Ryland Grace, protagonist of Project Hail Mary</figcaption>
</figure>
## Suspense
&nbsp;&nbsp;&nbsp;&nbsp;Both books have a similar thriller feel, but derive it from different sources. In The Martian, it feels like Mark 
Watney's in constant danger from simply living in such a hostile environment. In contrast, there's only a couple of 
moments when Ryland Grace really feels in danger, although these moments are well-executed.
## Conclusion
Project Hail Mary is the perfect novel for fans of Andy Weir's writing, surpassing Artemis and matching The Martian in my rating.
If you haven't read it yet, I highly suggest picking it up before the movie based on Project Hail Mary comes out next year!
        `
    },
    {
        id: '2',
        title: 'AI Medical Scribing Project Proposal',
        excerpt: 'Hierarchical Context Aggregation for Quality Automated Medical Notes',
        date: '2025-03-21',
        category: 'projects',
        image: '/images/scribingnormalization.png',
        tags: ['AI Scribing', 'NLP'],
        author: {
            name: 'Your Name',
            avatar: '/images/hailmary.png'
        },
        featured: true,
        content: `
# Authors

[Prakriti Shetty](mailto:psshetty@umass.edu)<br>  
[Priya Balakrishnan](mailto:pbalakrishna@umass.edu)<br> 
[Avinash Nandyala](mailto:anandyala@umass.edu)<br> 
[Donald Winkleman](mailto:dwinkelman@umass.edu)<br>

# 1 Introduction

    Electronic Health Records (EHRs) have been widely adopted to digitize and automate the collection of patient records, including medical history, consultation notes, and overall case documentation. However, current EHR systems primarily rely on manual data entry, which requires healthcare professionals to manually input information. This manual approach leads to several issues, such as data-entry errors, inconsistent documentation, reduced readability, and increased administrative workload. Consequently, this process not only affects data accuracy and usability but also contributes to physician dissatisfaction due to the significant time investment required for documentation.&nbsp;&nbsp;

    To mitigate these challenges, recent advancements have explored automated clinical documentation systems, commonly referred to as digital scribes. These systems aim to capture and transcribe physician-patient conversations into structured clinical notes, allowing healthcare professionals to focus on patient care rather than administrative tasks. However, many existing solutions primarily depend on automatic speech recognition (ASR) followed by named entity recognition (NER) to extract relevant medical terms, often presenting the output as a tabular summary of keywords. While such approaches offer some level of automation, they fail to capture the nuanced and structured nature of clinical documentation required for effective decision-making and seamless integration into EHR systems.&nbsp;&nbsp;

    In this work, we propose an advanced automated pipeline that processes audio transcripts from doctor-patient interactions to systematically extract key medical information and categorize it according to the standard SOAP (Subjective, Objective, Assessment, Plan) format. Our approach enhances traditional methods by incorporating hierarchical clustering for topic categorization, enabling fine-grained segmentation of medical discussions within the SOAP framework. This structured organization ensures that clinical notes are not only comprehensive and contextually accurate but also readily adaptable for integration into modern EHR systems, ultimately improving workflow efficiency and reducing the documentation burden on healthcare providers.&nbsp;&nbsp;

# 2 Related work

    [Falcetta et al., 2023](#references)'s systematic review on intelligent solutions for automatic speech recognition (ASR) and automatic documentation in medical interviews provided a comprehensive understanding of the problem landscape. Most of the selected studies followed a standardized pipeline, beginning with speech capture using tools such as the Google Speech-to-Text API or commercial ASR systems like Dragon NaturallySpeaking (Nuance). Speaker diarization and recognition were commonly implemented using Hidden Markov Models (HMMs) and Gaussian Mixture Models (GMMs), followed by speech enhancement techniques using Generative Adversarial Networks (GANs), or noise suppression using CNNs. The extracted information was then aligned with medical knowledge bases, including SNOMED-CT and BioPortal, to ensure accuracy and contextual relevance. Finally, structured tabular summaries were generated using machine learning and deep learning techniques, including Convolutional Neural Networks (CNNs), Recurrent Neural Networks (RNNs) such as Long Short-Term Memory (LSTM) networks, and Natural Language Processing (NLP) and Knowledge Extraction modules.

![Text Normalization Techniques and some of their classification](/images/scribingnormalization.png)

*Figure 1: Text Normalization Techniques and some of their classification*

## Speaker Normalisation

    [Aliero et al., 2023](#falcetta2023) provides a comprehensive methodology review of text normalization research across 54 papers from 2018-2022. It subdivides text normalization techniques into four methods shown in figure 1. Neural networks generally have high accuracy, especially with the exponential growth in LLM capabilities in recent years, but come at the cost of computational complexity. Rule-Based and Statistical Methods have the opposite tradeoff for general translation. However, Rule-Based techniques can succeed in domain-specific areas such as medicine when processing to and from specific terminology.

    Recently, research has shifted towards exploring hybrid approaches which generally utilize neural networks alongside rule-based, statistical methods, or both. For the small tradeoff in computational efficiency that comes with using multiple methods, higher accuracy can be achieved on domain-specific language normalization. Therefore, this technique would be best suited for our application.

## Topic Categorization

    Topic categorization in medical dialogues has traditionally relied on manual annotation by domain experts. However, recent research suggests automated approaches using hierarchical clustering can achieve comparable results. Two notable papers propose hierarchical clustering methods for topic modeling: [Kapoor et al., 2024](#aliero2023) focused specifically on news reports achieving strong performance metrics, and [Khandelwal, 2025](#kapoor2024) presented a more generalized document-level approach that enables nuanced topic categorization. While some approaches like prompt-based classification and document-to-document summarization techniques exist, they tend to require more manual effort or may not be as well-suited for dialogue-specific topic modeling.

## Generation of Doctor Notes

Prior work in automated clinical documentation has explored various approaches to structuring transcribed medical conversations. [Wenceslao and Estuar, 2019](#khandelwal2025) mapped transcribed text to multiple clinically relevant categories, including time expression identification, medical entity identification, attribute classification, and primary diagnosis classification. Similarly, [Khattak et al., 2019](#wenceslao2019) structured clinical notes into distinct categories, such as sign and symptom mentions, measurement annotations, disease and disorder mentions, medication mentions, and procedure mentions, thereby facilitating more organized and accessible documentation.

[Soltau et al., 2021](#khattak2019) employed a Named Entity Recognition (NER) tagging approach using Recurrent Neural Network Transducers (RNN-Ts) instead of conventional Conditional Random Fields (CRFs). This choice was motivated by the need to capture temporal dependencies, which play a crucial role in knowledge extraction. Building upon this, [Menon et al., 2021](#soltau2021) proposed a more structured approach, reducing lengthy text transcripts into a labeled set categorized into four key aspects: patient details, symptoms, previous prescriptions, and the current medical situation, and used a Support Vector Machine (SVM) model to evaluate classification accuracy.

A more contextually aware strategy was introduced by [Liu et al., 2024](#menon2021), who incorporated real-time health information extracted from consultation transcripts to construct patient profiles. This approach aimed to enhance the utility of extracted data for clinical decision-making and personalized patient care by integrating dynamically updated medical information alongside demographic details such as age and gender. An alternative line of research has explored generating summaries or paraphrased versions of transcriptions to improve clarity and expressiveness, but without much success.

In our work, we adopt the SOAP (Subjective, Objective, Assessment, and Plan) format for clinical documentation, originally introduced by [Schloss and Konam, 2020](#liu2024). This structured framework has long been a cornerstone of problem-oriented medical notes, providing a standardized and interpretable format for organizing clinical information. However, we extend this approach by integrating the contextual profiling methodology proposed by (Liu et al., 2024). Unlike their approach, which includes demographic attributes, our dataset does not contain patient demographic information. Instead, we synthesize a structured patient profile solely from the consultation transcript, ensuring that relevant clinical context is preserved without introducing demographic fields. By combining these methodologies, our approach seeks to balance structured documentation with dynamic, context-aware medical information extraction, ultimately enhancing both the usability and comprehensiveness of automated clinical notes.

# 3 Data

Our project requires high-quality medical dialogue data to develop a tool that transforms doctor-patient conversations into structured doctor notes in the SOAP format. To achieve this, we will utilize multiple publicly available datasets that contain real-world medical conversations.

The MedDialog-EN dataset is a large-scale English-language corpus featuring approximately 300,000 medical consultations and 500,000 utterances. These conversations span 2 broad medical specialties, including internal medicine, pediatrics, and dentistry, and further branch into 172 fine-grained sub-specialties. Each consultation consists of two components, a description of the patient's medical condition and conversations between the patient and doctor [Zeng et al., 2020](#schloss2020). This dataset is freely accessible and has been widely adopted in medical NLP research, making it a reliable resource for our project. The detailed patient condition descriptions serve as essential context for generating structured medical summaries in the SOAP note format.

The Zenodo dataset consists of English-language transcripts of psychiatric consultations, specifically created for training machine learning models to generate psychiatric case notes from doctor-patient conversations [Kazi et al., 2020](#zeng2020). This dataset is structured in JSON format, with each transcript containing doctor-patient interactions along with corresponding case notes (Kazi et al., 2020). Its clear annotations, structured dialogue format, and focus on psychiatric consultations make it a valuable resource for our project.

The MTS-Dialog Augmented Dataset consists of 3,600 medical dialogue-summary pairs, created by augmenting the original 1,200 training samples through back translation using French and Spanish. The dataset is designed for medical conversation summarization, making it relevant to our goal [Ben Abacha et al., 2023](#kazi2020).

Each conversation is paired with a human-written summary, making it particularly useful for training dialogue summarization models. To enhance linguistic diversity and improve model generalization, the dataset was expanded through back translation, where English dialogues were translated into French and Spanish and then back into English (Ben Abacha et al., 2023). This augmentation technique helps create more varied sentence structures and phrasing, ensuring that models trained on this dataset are more robust and adaptable to real-world medical conversations.

The VRBot (KaMed) dataset is a Chinese medical dialogue corpus sourced from ChunyuDoctor, an online medical consultation platform. It contains long-form, multi-turn conversations spanning over 100 hospital departments and incorporates external medical knowledge from CMeKG, China's largest medical knowledge graph [Li et al., 2021](#benabacha2023). Since our model operates in English, we would need to translate this dataset using MarianMT or similar machine translation models. However, its inclusion in our training pipeline is conditional. We will evaluate its impact on model performance and integrate it only if it provides measurable improvements to SOAP note generation.

# 4 Approach

    Our broad baseline algorithm is that of Unsupervised Hierarchical Clustering for topic annotation in medical consultation transcripts.

    We define our problem statement as follows: Given a raw speech transcript dataset D (English) from a doctor-patient consultation, we process it using the following pipeline to generate tabulated doctor notes N as our result.

    1. **Extraction of data**: Our raw speech transcript dataset D can be in a variety of forms, spanning CSV files to JSON formats. Our first step will be to extract all of them to a common CSV where every entry T is a multi-turn conversation between the doctor and the patient during a particular medical consultation.

    2. **Spoken Language Normalization**: Given a speech transcript T, we aim to transform colloquial spoken English into a more formal written format by eliminating fillers and pauses. Additionally, we plan to ground the transcript against a medical terminology database to enhance contextual accuracy and domain-specific coherence. At the end of this exercise, we have an enhanced transcript T′, with meaningful and concise sentences.

       Following the recommendation of Aliero et al [Aliero et al., 2023](#falcetta2023), we will utilize a hybrid text normalization technique known as a rule-based multihead attention model. We plan to use an AI agent system with an open-source LLM like phi4 to normalize transcripts. For our model's runtime environment, we'll use Ollama, and LangChain. LangChain additionally supports various rule-based text normalization functions which we plan to utilize before and after the use of our LLM. The LLM will have access to a ChromaDB database representing the standard academic style it should translate the medical transcripts to. This data will be effectively relayed to the LLM as context in its translation via LangChain.

       We will be running this step on the cloud, likely on google colab or similar, as this offers more processing power than we have locally and better supports collaboration. Application of LangChain's rule-based normalization capabilities, proper preprocessing of our medical terminology database, and effective prompt engineering for our base model will all be essential for this step.

    3. **Key-Phrase Extraction**: At this point, we extract a set of key phrases K from our transcript T′ in preparation for clustering in the next step.

       Note that we also maintain a separate set Kp of the dialogues spoken exclusively by the patient, which will be used for further analysis in the next step.

    4. **Topic Categorization**: Given the set K (and Kp) of key phrases corresponding to the transcript T′, we employ hierarchical clustering to group phrases pertaining to the same topic together hierarchically, such that we finally end up with 4 main clusters corresponding to the SOAP format for clinical notes (SOAP stands for Subjective, Objective, Assessment, Plan).

    5. **Generation of Doctor Notes**: We generate doctor notes N in the tabular format according to the SOAP standard for clinical notes, with provisions for more fine-grained categorization within the 4 broad segments.′, with meaningful and concise sentences.

Figure 2 provides a diagrammatic description of our entire pipeline, illustrating the flow from raw transcript processing through normalization, key-phrase extraction, and topic categorization, to the final generation of structured SOAP notes.

![Our proposed pipeline for automated clinical documentation](/images/scribingpipeline1.png)

*Figure 2: Our proposed pipeline for automated clinical documentation generation from doctor-patient conversations. The system processes raw transcripts through multiple stages including normalization, key-phrase extraction, topic categorization using hierarchical clustering, and finally generates structured SOAP notes.*

Let's now delve into the intricacies of every aspect of our approach, complete with the tooling and methods we plan to implement.

## 4.1 Spoken Language Normalization

### 4.1.1 Input and Output

Given a speech transcript T, the goal is to transform colloquial spoken English into a more formal written format by eliminating fillers, pauses, and irregular speech patterns. Additionally, the transcript is grounded against a medical terminology database to enhance contextual accuracy and domain-specific coherence. The output is an enhanced transcript T′ with meaningful and concise sentences, facilitating further downstream processing.

### 4.1.2 Plan

Following the recommendation of (Aliero et al., 2023), we employ a hybrid text normalization approach based on a rule-based multihead attention model. Specifically, we use an AI agent system with an open-source LLM like Phi-4 to perform spoken-to-written text normalization. The model is provided with a ChromaDB knowledge base containing medical and academic language standards. LangChain facilitates structured data retrieval from ChromaDB, ensuring context-aware normalization. Additionally, LangChain's rule-based text normalization functions are applied before and after the LLM processing to refine the output further.

### 4.1.3 Evaluation

The effectiveness of the normalised transcripts can be evaluated using topic coherence assessment metrics [Stammbach et al., 2023](#li2021), which measure how semantically meaningful and consistent the identified topics are within the medical context.

## 4.2 Key-Phrase Extraction

### 4.2.1 Input and Output

We will use the transcript T′ as input in the key phrase extraction step. The output of this step is a set of key phrases K = k1, k2, ..., km where each ki represents a significant thematic element within the corpus of transcripts. These key phrases serve as semantic anchors for topic categorization.

### 4.2.2 Plan

The (Kapoor et al., 2024) approach takes advantage of the contextual understanding and clustering algorithms of LLM to identify relevant key phrases from text documents. Although the original paper implements multiple clustering methods, including K-Means, the following algorithm focuses specifically on the hierarchical clustering component for key phrase extraction for medical dialogues.

Our plan for key-phrase extraction follows a structured approach that leverages both the semantic understanding capabilities of large language models and the organizational power of hierarchical clustering. We first extract candidate phrases from each transcript using an LLM and then verify their coherence to filter out potential hallucinations. Next, we compute semantic similarities between the remaining phrases and apply hierarchical clustering to identify natural groupings. Finally, we select exemplar terms from each cluster to serve as our definitive key phrases. This approach maintains the semantic richness of manual annotation while providing a scalable and automated alternative.

The hierarchical clustering approach offers several advantages over alternative methods. Unlike partitional clustering techniques that require a predefined number of clusters, hierarchical clustering discovers the natural structure within the data. This property is particularly valuable for transcript analysis where the optimal number of topics is rarely known a priori. Additionally, the resulting dendrogram provides insights into the relationships between different topics, enabling multi-level topic exploration if desired. The algorithm below is adapted from the QualIT approach presented by (Kapoor et al., 2024), with modifications to specifically handle medical dialogue transcripts and incorporate hallucination checks for clinical accuracy. The complete algorithm is detailed in Algorithm 1.

![Key-Phrase Extraction via LLM and Hierarchical Clustering](/images/scribingsentence.png)

**Algorithm 1: Key-Phrase Extraction via LLM, Hallucination Check, and Hierarchical Clustering**

**Require**: Set of transcripts T′ = {t1, t2, ..., tn}, coherence threshold θ, embedding model E, large language model LLM
**Ensure**: Set of key phrases K = {k1, k2, ..., km}
**Initialize**: P ← ∅ {All candidate phrases}

**Step 1**: Key Phrase Extraction via LLM

for each transcript ti ∈ T′ do
    Pi ← LLM(ti, "Extract key phrases from this transcript")
    P ← P ∪ Pi {Accumulate key phrase candidates}
end for

**Step 2**: Hallucination Check / Coherence Filtering

P′ ← ∅ {Filtered set of phrases}
for each phrase p ∈ P do
    Compute coherence score:
    Cp = (1/n) * Σ(j=1 to n) [E(p) · E(tj) / (||E(p)|| · ||E(tj)||)]
    if Cp ≥ θ then
        P′ ← P′ ∪ {p} {Keep phrases above threshold}
    end if
end for

**Step 3**: Construct Similarity Matrix

V ← ∅ {Store embeddings for all filtered phrases}
for each phrase p ∈ P′ do
    vp ← E(p)
    V ← V ∪ {vp}
end for
Compute similarity matrix S where:
Sij = vi · vj / (||vi|| ||vj||)
Convert to distance matrix D where:
Dij = 1 − Sij

**Step 4**: Hierarchical Clustering

H ← HierarchicalClustering(D, "complete") {Build cluster tree using a linkage method, e.g., 'complete'}
Use Silhouette score to find optimal cluster count mopt:
s(i) = (b(i) − a(i)) / max(a(i), b(i)), if |Ci| > 1
      = 0, if |Ci| = 1
mopt ← DetermineBestClusterCount(H, S)
G ← CutTree(H, mopt) {Obtains mopt clusters, G = {G1, G2, ..., Gmopt}}

**Step 5**: Exemplar (Centroid) Selection

K ← ∅ {Final set of key phrases}
for each cluster Gi ∈ G do
    Compute centroid:
    ci = (1/|Gi|) * Σv∈Gi v
    Find exemplar:
    ei = arg min(pj ∈ Gi) ||E(pj) − ci||²
    K ← K ∪ {ei}
end for

**Output**: K = {k1, k2, ..., kmopt} {Final set of extracted key phrases}

### 4.2.3 Evaluation

We will evaluate the key-phrase extraction algorithm using both intrinsic and extrinsic metrics. For clustering quality assessment, we will employ the Silhouette Coefficient and Calinski-Harabasz Index to measure intra-cluster cohesion and inter-cluster separation. We will also compute ROUGE-L and BLEU scores to compare our automatically extracted phrases against manually annotated reference phrases from a subset of the corpus. For hallucination detection performance, we will calculate precision, recall, and F1 scores using a test set of deliberately injected non-coherent phrases.

## 4.3 Topic Categorization

### 4.3.1 Input and Output

We use the output of the of key-phrase extraction step as input to the topic categorization step. ie., all the key phrases extracted from the transcript are used as input to the topic categorization step.

### 4.3.2 Plan

This step transforms the clustered key phrases into a comprehensive, medically accurate SOAP note by generating coherent prose for each section. The process follows a modular approach similar to the Cluster2Sent algorithm210, where semantically related key phrases guide the generation of individual sentences that are then combined into section-specific narratives.

We first process each SOAP section independently, using the corresponding categorized key phrases as semantic anchors. For each section, we employ an abstractive summarization approach that preserves medical accuracy while ensuring the generated text adheres to the distinct writing styles characteristic of each SOAP component. The Subjective and Objective sections typically present concise, factual statements drawn directly from patient-reported information and clinical observations, while the Assessment section synthesizes this information into diagnostic conclusions, and the Plan section articulates actionable treatment recommendations.

By generating each section separately, we maintain the structure and purpose of clinical documentation while ensuring the faithful representation of the transcript content. This modular approach helps prevent information hallucination and ensures that the generated notes maintain clinical accuracy and relevance The generation process follows Algorithm 2:

![Pipeline Visual Overview](/images/scribingpipeline2.png)

**Algorithm 2: SOAP Note Generation from Categorized Key Phrases**

**Require**: Categorized key phrase clusters CS, CO, CA, CP; fine-tuned section-specific models MS, MO, MA, MP
**Ensure**: Complete SOAP note N = NS, NO, NA, NP

for each section i ∈ S, O, A, P do
    C′i ← OrderPhrasesByRelevance(Ci) {Order phrases by clinical relevance}
    prompti ← ConstructPrompt(C′i) {Create section-specific prompt}
    Ni ← Mi(prompti) {Generate section text using appropriate model}
    Ni ← PostProcess(Ni) {Ensure clinical consistency and coherence}
end for
return N = NS, NO, NA, NP

### 4.3.3 Evaluation

The effectiveness of these automated approaches can be evaluated using topic coherence assessment metrics (Stammbach et al., 2023), which measure how semantically meaningful and consistent the identified topics are within the medical context. We will evaluate topic categorization using multiple coherence metrics tailored to the SOAP format. For each category (S, O, A, P), we will calculate normalized pointwise mutual information (NPMI) between key phrases within the same cluster, measuring statistical coherence based on co-occurrence patterns. Semantic coherence is assessed by computing the average cosine similarity between phrase embeddings within each SOAP section using clinical domain-specific models such as ClinicalBERT. This approach evaluates semantic relationships rather than just term co-occurrence. For external validation, we can compare automatically generated SOAP categorizations with a gold standard datasets of manually categorized transcripts like (Zeng et al., 2020) and [Finley et al., 2018](#stammbach2023), calculating precision, recall, and F1 scores for each SOAP section independently.

# 5 Schedule

Our project is divided into several key phases, with estimated time allocations for each. Responsibilities will be distributed among team members based on expertise, and certain tasks will be completed collaboratively.

- **Data Acquisition and Preprocessing (2 weeks)**
  - Collect and clean medical dialogue datasets (MedDialog-EN, Zenodo, MTS-Dialog, and potentially VRBot).
  - Convert all datasets into a common format.
  - Perform spoken language normalization, including paraphrasing colloquial expressions, grounding terms in medical terminology, and handling fillers and pauses.
  - Conduct initial data quality assessment.

- **Key-Phrase Extraction and Topic Categorization (2 weeks)**
  - Implement key-phrase extraction techniques to identify important medical information from transcripts.
  - Apply hierarchical clustering to categorize extracted phrases into SOAP note sections.
  - Tune clustering parameters and evaluate topic coherence using relevant metrics.

- **Doctor Note Generation (1 week)**
  - Develop a model to structure extracted information into SOAP-format doctor notes.
  - Implement summarization techniques to improve coherence and readability.
  - Validate model outputs against human-written notes.

- **Model Evaluation and Error Analysis (3 weeks)**
  - Analyze the performance of generated SOAP notes.
  - Identify common model errors and refine clustering/summarization approaches.
  - Compare results with existing medical documentation methods.

- **Final Report and Documentation (1 week)**
  - Compile findings and results into a structured report.
  - Document methodologies, datasets, and evaluation metrics.
  - Prepare a presentation if required.

# 6 Tools

- LangChain for creating AI agents for steps like spoken language normalization and implementation of RAG
- Vector database like ChromaDB
- Ollama for downloading and running models
- Selenium for any necessary web scraping
- Google Colab for GPUs
- Phi4, a SOTA 14b llm by Microsoft
- Deepseek R1, a SOTA 14b llm by Deepseek with COT
- Sklearn for common ML algorithms like random forest
- UnityHPC and Colab for GPUs

# 7 Estimation of API Credits

We use LLMs in 3 major steps of our pipeline, namely the spoken language normalisation, key phrase extraction and topic categorisation.

Our MedDialog dataset consists of 300,000 transcripts, and we can safely assume 10-20 words per transcript, which translates to roughly 15-20 tokens (courtesy TikTokeniser) Assuming an average of 20 tokens per transcript, and a GPT-4o pricing of $2.5 for every 1M input tokens, we estimate a $15 usage per stage of the pipeline. Since we have three major stages of the pipeline that relies on the usage of LLMs, we incur a total estimated cost of $45.

# References

Falcetta, F. S., De Almeida, F. K., Lemos, J. C. S., Goldim, J. R., and Da Costa, C. A. (2023). <a id="falcetta2023"></a>Automatic documentation of professional health interactions: A systematic review. Artificial Intelligence in Medicine, 137:102487.

Aliero, A., Bashir, S., Aliyu, H., Tafida, A., Kangiwa, B., and Dankolo, N. (2023). <a id="aliero2023"></a>Systematic review on text normalization techniques and its approach to non-standard words. International Journal of Computer Applications, 185:975–8887.

Kapoor, S., Gil, A., Bhaduri, S., Mittal, A., and Mulkar, R. (2024). <a id="kapoor2024"></a>Qualitative insights tool (qualit): Llm enhanced topic modeling.

Khandelwal, T. (2025). <a id="khandelwal2025"></a>Using llm-based approaches to enhance and automate topic labeling.

Wenceslao, S. J. M. C. and Estuar, M. R. J. E. (2019). <a id="wenceslao2019"></a>Using cTAKES to Build a Simple Speech Transcriber Plugin for an EMR. In Proceedings of the 3rd International Conference on Medical and Health Informatics, ICMHI '19, pages 78–86, New York, NY, USA. Association for Computing Machinery.

Khattak, F. K., Jeblee, S., Crampton, N., Mamdani, M., and Rudzicz, F. (2019). <a id="khattak2019"></a>AutoScribe: Extracting Clinically Pertinent Information from Patient-Clinician Dialogues. In MEDINFO 2019: Health and Wellbeing e-Networks for All, pages 1512–1513. IOS Press.

Soltau, H., Wang, M., Shafran, I., and Shafey, L. E. (2021). <a id="soltau2021"></a>Understanding Medical Conversations: Rich Transcription, Confidence Scores & Information Extraction. arXiv:2104.02219 [cs].

Menon, N. G., Shrivastava, A., Bhavana, N. D., and Simon, J. (2021). <a id="menon2021"></a>Deep Learning based Transcribing and Summarizing Clinical Conversations. In 2021 Fifth International Conference on I-SMAC (IoT in Social, Mobile, Analytics and Cloud) (I-SMAC), pages 358–365. ISSN: 2768-0673.

Liu, Z., Salleh, S., Krishnaswamy, P., and Chen, N. (2024). <a id="liu2024"></a>Context Aggregation with Topic-focused Summarization for Personalized Medical Dialogue Generation. In Naumann, T., Ben Abacha, A., Bethard, S., Roberts, K., and Bitterman, D., editors, Proceedings of the 6th Clinical Natural Language Processing Workshop, pages 310–321, Mexico City, Mexico. Association for Computational Linguistics.

Schloss, B. and Konam, S. (2020). <a id="schloss2020"></a>Towards an Automated SOAP Note: Classifying Utterances from Medical Conversations. In Proceedings of the 5th Machine Learning for Healthcare Conference, pages 610–631. PMLR. ISSN: 2640-3498.

Zeng, G., Yang, W., Ju, Z., Yang, Y., Wang, S., Zhang, R., Zhou, M., Zeng, J., Dong, X., Zhang, R., Fang, H., Zhu, P., Chen, S., and Xie, P. (2020). <a id="zeng2020"></a>MedDialog: Large-scale medical dialogue datasets. In Webber, B., Cohn, T., He, Y., and Liu, Y., editors, Proceedings of the 2020 Conference on Empirical Methods in Natural Language Processing (EMNLP), pages 9241–9250, Online. Association for Computational Linguistics.

Kazi, N., Kuntz, M., Kanewala, U., and Kahanda, I. (2020). <a id="kazi2020"></a>Dataset for automated medical transcription. The dataset contains transcripts of psychiatric doctor-patient conversations generated for training machine learning models in automated medical transcription.

Ben Abacha, A., Yim, W.-w., Fan, Y., and Lin, T. (2023). <a id="benabacha2023"></a>An empirical study of clinical note generation from doctor-patient encounters. In Proceedings of the 17th Conference of the European Chapter of the Association for Computational Linguistics, pages 2291–2302, Dubrovnik, Croatia. Association for Computational Linguistics.

Li, D., Ren, Z., Ren, P., Chen, Z., Fan, M., Ma, J., and de Rijke, M. (2021). <a id="li2021"></a>Semi-supervised variational reasoning for medical dialogue generation. arXiv preprint arXiv:2105.06071. Accepted by SIGIR 2021.

Stammbach, D., Zouhar, V., Hoyle, A., Sachan, M., and Ash, E. (2023). <a id="stammbach2023"></a>Revisiting automated topic model evaluation with large language models.

Finley, G., Edwards, E., Robinson, A., Brenndoerfer, M., Sadoughi, N., Fone, J., Axtmann, N., Miller, M., and Suendermann-Oeft, D. (2018). <a id="finley2018"></a>An automated medical scribe for documenting clinical encounters. In Liu, Y., Paek, T., and Patwardhan, M., editors, Proceedings of the 2018 Conference of the North American Chapter of the Association for Computational Linguistics: Demonstrations, pages 11–15, New Orleans, Louisiana. Association for Computational Linguistics.
            `
    }]